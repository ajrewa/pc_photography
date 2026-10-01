import { getObject } from "../services/storage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const contentTypeFor = (key) => {
  if (/\.mp4$/i.test(key)) return "video/mp4";
  if (/\.webm$/i.test(key)) return "video/webm";
  if (/\.mov$/i.test(key)) return "video/quicktime";
  if (/\.png$/i.test(key)) return "image/png";
  if (/\.webp$/i.test(key)) return "image/webp";
  if (/\.gif$/i.test(key)) return "image/gif";
  return "image/jpeg";
};

export const getMedia = asyncHandler(async (req, res) => {
  const key = req.params[0];
  if (!key || key.includes("..")) return res.status(400).json({ error: "Invalid media path." });

  try {
    const object = await getObject(key, req.headers.range);
    res.status(req.headers.range ? 206 : 200);
    res.setHeader("Content-Type", object.ContentType || contentTypeFor(key));
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    if (object.ContentLength !== undefined) res.setHeader("Content-Length", object.ContentLength);
    if (object.ContentRange) res.setHeader("Content-Range", object.ContentRange);
    object.Body.pipe(res);
  } catch (error) {
    if (error.name === "NoSuchKey" || error.$metadata?.httpStatusCode === 404) {
      return res.status(404).json({ error: "Media file not found." });
    }
    throw error;
  }
});
