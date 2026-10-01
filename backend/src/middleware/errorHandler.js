import mongoose from "mongoose";
import multer from "multer";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Every error leaves the API in the same shape:
 *   { "error": "Human readable message", "details": { field: "message" } }
 */
export function errorHandler(err, req, res, _next) {
  if (res.headersSent) return;

  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.fromEntries(
      Object.entries(err.errors).map(([path, e]) => [
        path,
        e.name === "CastError" ? (e.kind === "Number" ? "Enter a valid number." : "Invalid value.") : e.message,
      ])
    );
    return res.status(400).json({ error: "Some fields need attention.", details });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: `Invalid value for "${err.path}".` });
  }

  if (err?.code === 11000) {
    const field = Object.keys(err.keyPattern ?? {})[0] ?? "value";
    return res.status(409).json({ error: `That ${field} is already in use.` });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: `File is too large. The limit is ${env.maxUploadMb} MB.` });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON." });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large." });
  }

  console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  res.status(500).json({
    error: env.isProd ? "Something went wrong on the server." : err.message || "Internal server error.",
  });
}
