import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 * Reads and validates environment variables once, so the rest of the app
 * imports plain values from here instead of touching process.env.
 */

if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const positiveNumber = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const trimSlash = (value = "") => value.trim().replace(/\/+$/, "");

const nodeEnv = process.env.NODE_ENV || "development";

const b2Endpoint = trimSlash(process.env.B2_ENDPOINT);
// "https://s3.us-west-004.backblazeb2.com" -> "us-west-004"
const b2Region =
  process.env.B2_REGION?.trim() ||
  b2Endpoint.match(/s3\.([a-z0-9-]+)\.backblazeb2\.com/i)?.[1] ||
  "us-west-004";
const b2Bucket = (process.env.B2_BUCKET_NAME || process.env.B2_BUCKET || "").trim();
const b2KeyId = process.env.B2_KEY_ID?.trim() || "";
const b2AppKey = process.env.B2_APPLICATION_KEY?.trim() || "";

export const env = {
  nodeEnv,
  isProd: nodeEnv === "production",
  isTest: nodeEnv === "test",
  port: positiveNumber(process.env.PORT, 5000),
  publicApiUrl: trimSlash(process.env.PUBLIC_API_URL || ""),
  mongoUri: process.env.MONGODB_URI,

  // Comma separated list of frontend origins allowed by CORS. "*" allows any.
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),

  // Number of reverse proxies in front of the app (Render, Railway, Nginx...).
  // Needed so rate limiting sees the real client IP.
  trustProxy: positiveNumber(process.env.TRUST_PROXY, nodeEnv === "production" ? 1 : 0),

  maxUploadMb: positiveNumber(process.env.MAX_UPLOAD_MB, 500),

  b2: {
    keyId: b2KeyId,
    applicationKey: b2AppKey,
    bucket: b2Bucket,
    endpoint: b2Endpoint,
    region: b2Region,
    // Where files are served from. Defaults to the bucket's public S3 URL,
    // but can be a CDN / custom domain / native "friendly" URL.
    publicUrl:
      trimSlash(process.env.B2_PUBLIC_URL) ||
      (b2Bucket ? `https://${b2Bucket}.s3.${b2Region}.backblazeb2.com` : ""),
    configured: Boolean(b2KeyId && b2AppKey && b2Bucket && b2Endpoint),
  },
};
