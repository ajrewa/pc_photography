import fs from "node:fs";
import crypto from "node:crypto";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectVersionsCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../config/b2.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

/** Accepted upload types, and the extension each is stored with. */
export const ALLOWED_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

export function assertStorageConfigured() {
  if (!s3) {
    throw new ApiError(
      503,
      "File storage is not configured. Set the B2_* variables in backend/.env and restart the server."
    );
  }
}

/**
 * Streams a local file to B2 (multipart, so large videos don't sit in memory).
 * Files are stored as  images|videos/YYYY/MM/<uuid>.<ext>  and are immutable,
 * so they can be cached for a year.
 */
export async function uploadFile({ filePath, mimetype }) {
  assertStorageConfigured();

  const kind = mimetype.startsWith("video/") ? "videos" : "images";
  const now = new Date();
  const key = [
    kind,
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    `${crypto.randomUUID()}${ALLOWED_TYPES[mimetype]}`,
  ].join("/");

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: env.b2.bucket,
      Key: key,
      Body: fs.createReadStream(filePath),
      ContentType: mimetype,
      CacheControl: "public, max-age=31536000, immutable",
    },
    partSize: 10 * 1024 * 1024,
    queueSize: 3,
    leavePartsOnError: false,
  });
  await upload.done();

  return { key, kind };
}

export async function getObject(key, range) {
  assertStorageConfigured();
  return s3.send(
    new GetObjectCommand({
      Bucket: env.b2.bucket,
      Key: key,
      ...(range ? { Range: range } : {}),
    })
  );
}

/** True when the URL points at a file inside our bucket (as opposed to Unsplash, YouTube...). */
export function isManagedUrl(url) {
  return Boolean(urlToKey(url));
}

export function urlToKey(url) {
  if (typeof url !== "string") return null;
  if (Boolean(env.b2.publicUrl) && url.startsWith(`${env.b2.publicUrl}/`)) {
    const path = url.slice(env.b2.publicUrl.length + 1).split(/[?#]/)[0];
    return decodeURIComponent(path);
  }
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/api/media/")) {
      return parsed.pathname.slice("/api/media/".length).split("/").map(decodeURIComponent).join("/");
    }

    const pathParts = parsed.pathname.split("/").filter(Boolean).map(decodeURIComponent);
    if (pathParts[0] === "file" && pathParts[1] === env.b2.bucket) return pathParts.slice(2).join("/");
    if (parsed.hostname.startsWith(`${env.b2.bucket}.s3.`)) return pathParts.join("/");
  } catch {
    // Invalid URLs are simply not managed media.
  }
  return null;
}

export function toMediaProxyUrl(url, req) {
  const key = urlToKey(url);
  if (!key) return url;
  const baseUrl = env.publicApiUrl || `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}

/**
 * Permanently deletes a file.
 * B2 buckets keep every version of a file by default, and a plain delete only
 * adds a "hide" marker while the bytes keep being billed. So we delete each
 * version explicitly and fall back to a plain delete if versions can't be listed.
 */
export async function deleteObject(key) {
  assertStorageConfigured();
  const Bucket = env.b2.bucket;

  let versions = [];
  try {
    const listed = await s3.send(new ListObjectVersionsCommand({ Bucket, Prefix: key }));
    versions = [...(listed.Versions ?? []), ...(listed.DeleteMarkers ?? [])].filter(
      (v) => v.Key === key && v.VersionId
    );
  } catch {
    // Listing not available: fall through to the plain delete below.
  }

  if (versions.length === 0) {
    await s3.send(new DeleteObjectCommand({ Bucket, Key: key }));
    return;
  }
  for (const version of versions) {
    await s3.send(new DeleteObjectCommand({ Bucket, Key: key, VersionId: version.VersionId }));
  }
}
