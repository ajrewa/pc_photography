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
          for (const field of mediaFields) {
            if (field.endsWith(".image")) {
              const arrayField = field.slice(0, -".image".length);
              if (Array.isArray(item[arrayField])) {
                item[arrayField] = item[arrayField].map((entry) => ({
                  ...entry,
                  image: toMediaProxyUrl(entry.image, req),
                }));
              }
            } else {
              item[field] = Array.isArray(item[field])
                ? item[field].map((url) => toMediaProxyUrl(url, req))
                : toMediaProxyUrl(item[field], req);
            }
          }
          return item;
        }),
      ];
    })
  );

  // Always fresh, so changes made in the admin panel show up on the next page load.
  res.set("Cache-Control", "no-store");
  res.json(Object.fromEntries(entries));
});
