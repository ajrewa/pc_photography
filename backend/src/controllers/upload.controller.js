import fs from "node:fs/promises";
import { env } from "../config/env.js";
import { cleanupMedia } from "../services/media.service.js";
import { isManagedUrl, uploadFile } from "../services/storage.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * POST /api/admin/upload   (multipart/form-data, field "file")
 * Stores the file in Backblaze B2 and returns its public URL.
 */
export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'Attach a file in the "file" field.');

  try {
    const { key, kind } = await uploadFile({
      filePath: req.file.path,
      mimetype: req.file.mimetype,
    });
    const baseUrl = env.publicApiUrl || `${req.protocol}://${req.get("host")}`;
    res.status(201).json({
      url: `${baseUrl}/api/media/${key.split("/").map(encodeURIComponent).join("/")}`,
      key,
      type: kind === "videos" ? "video" : "image",
      size: req.file.size,
    });
  } finally {
    await fs.unlink(req.file.path).catch(() => {});
  }
});

/**
 * DELETE /api/admin/upload   { "url": "..." }
 * Removes a file that was uploaded but never saved on an item (e.g. the admin
 * cancelled the form). Refuses to touch files that are still in use.
 */
export const deleteMedia = asyncHandler(async (req, res) => {
  const url = typeof req.body?.url === "string" ? req.body.url.trim() : "";
  if (!isManagedUrl(url)) {
    throw new ApiError(400, "That file is not stored in this project's B2 bucket.");
  }
  const deleted = await cleanupMedia([url]);
  res.json({ deleted: deleted.includes(url) });
});
