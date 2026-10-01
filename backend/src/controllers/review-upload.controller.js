import fs from "node:fs/promises";
import { env } from "../config/env.js";
import { uploadFile } from "../services/storage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const uploadReviewImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Attach an image in the "file" field.' });

  try {
    const { key } = await uploadFile({ filePath: req.file.path, mimetype: req.file.mimetype });
    const baseUrl = env.publicApiUrl || `${req.protocol}://${req.get("host")}`;
    res.status(201).json({
      url: `${baseUrl}/api/media/${key.split("/").map(encodeURIComponent).join("/")}`,
    });
  } finally {
    await fs.unlink(req.file.path).catch(() => {});
  }
});