import os from "node:os";
import crypto from "node:crypto";
import multer from "multer";
import { env } from "../config/env.js";
import { ALLOWED_TYPES, assertStorageConfigured } from "../services/storage.service.js";
import { ApiError } from "../utils/ApiError.js";

// Files land in the OS temp dir first, then get streamed to B2 and removed.
// (Disk instead of memory, so a 300 MB video doesn't take 300 MB of RAM.)
const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (_req, _file, cb) => cb(null, `upload-${crypto.randomUUID()}`),
});

const parser = multer({
  storage,
  limits: { fileSize: env.maxUploadMb * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (Object.hasOwn(ALLOWED_TYPES, file.mimetype)) return cb(null, true);
    cb(new ApiError(415, "Unsupported file type. Use JPG, PNG, WebP, GIF, AVIF, MP4, WebM or MOV."));
  },
}).single("file");

const imageParser = multer({
  storage,
  limits: { fileSize: Math.min(env.maxUploadMb, 10) * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") && Object.hasOwn(ALLOWED_TYPES, file.mimetype)) return cb(null, true);
    cb(new ApiError(415, "Unsupported image type. Use JPG, PNG, WebP, GIF or AVIF."));
  },
}).single("file");

/** Refuses early when B2 isn't configured, before any bytes are received. */
export function uploadSingle(req, res, next) {
  try {
    assertStorageConfigured();
  } catch (error) {
    return next(error);
  }
  parser(req, res, next);
}

export function uploadImageSingle(req, res, next) {
  try {
    assertStorageConfigured();
  } catch (error) {
    return next(error);
  }
  imageParser(req, res, next);
}
