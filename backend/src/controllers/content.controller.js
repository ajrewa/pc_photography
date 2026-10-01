import { SECTIONS, DISPLAY_SORT } from "../models/index.js";
import { toMediaProxyUrl } from "../services/storage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/content
 * Returns exactly what the frontend's SiteContent type expects:
 *   { hero: [], films: [], india: [], gratitude: [] }
 */
export const getContent = asyncHandler(async (req, res) => {
  const entries = await Promise.all(
    Object.entries(SECTIONS).map(async ([name, { Model, mediaFields }]) => {
      const docs = await Model.find().sort(DISPLAY_SORT);
      return [
        name,
        docs.map((doc) => {
          const item = doc.toObject();
          for (const field of mediaFields) item[field] = toMediaProxyUrl(item[field], req);
          return item;
        }),
      ];
    })
  );

  // Always fresh, so changes made in the admin panel show up on the next page load.
  res.set("Cache-Control", "no-store");
  res.json(Object.fromEntries(entries));
});
