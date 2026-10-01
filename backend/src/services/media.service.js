import { SECTIONS } from "../models/index.js";
import { deleteObject, isManagedUrl, urlToKey } from "./storage.service.js";

/** Every media URL stored on a document (image, thumbnail, videoUrl...). */
export function collectMedia(section, doc) {
  return section.mediaFields.map((field) => doc.get(field)).filter(Boolean);
}

/** Is this file used by any document, in any section? */
async function isReferenced(url) {
  for (const section of Object.values(SECTIONS)) {
    const used = await section.Model.exists({
      $or: section.mediaFields.map((field) => ({ [field]: url })),
    });
    if (used) return true;
  }
  return false;
}

/**
 * Deletes the given files from B2, but only if they live in our bucket and no
 * document uses them any more. Never throws: a failed cleanup must not fail
 * the request that triggered it (the worst case is an unused file left in B2).
 * Returns the URLs that were actually deleted.
 */
export async function cleanupMedia(urls) {
  const deleted = [];
  for (const url of [...new Set(urls)].filter(isManagedUrl)) {
    try {
      if (await isReferenced(url)) continue;
      await deleteObject(urlToKey(url));
      deleted.push(url);
    } catch (error) {
      console.error(`[media] Could not delete ${url}: ${error.message}`);
    }
  }
  return deleted;
}
