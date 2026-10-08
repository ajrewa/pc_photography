import mongoose from "mongoose";
import { SECTIONS, sectionNames } from "../models/index.js";
import { cleanupMedia, collectMedia } from "../services/media.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify, uniqueSlug } from "../utils/slugify.js";
import { detectVideoType, toEmbedUrl } from "../utils/video.js";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

// Media and film links must be an absolute http(s) URL or a site path ("/films/...").
const URL_LIKE = /^(https?:\/\/|\/(?!\/))/i;

function getSection(name) {
  if (!Object.hasOwn(SECTIONS, name)) {
    throw new ApiError(404, `Unknown section "${name}". Use one of: ${sectionNames.join(", ")}.`);
  }
  return SECTIONS[name];
}

async function findOr404(section, id) {
  if (!mongoose.isValidObjectId(id)) throw new ApiError(400, "Invalid id.");
  const doc = await section.Model.findById(id);
  if (!doc) throw new ApiError(404, "Item not found.");
  return doc;
}

/**
 * Turns a request body into clean document data:
 *  - keeps only the allow-listed fields of the section
 *  - trims strings, turns "" into "unset", coerces numbers
 *  - derives videoType / embed URL from videoUrl
 */
function normalizePayload(section, body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ApiError(400, "Send a JSON object in the request body.");
  }

  const data = {};
  for (const field of section.fields) {
    if (!Object.hasOwn(body, field)) continue;

    let value = body[field];
    if (typeof value === "string") value = value.trim();

    if (value === "" || value === null) {
      value = field === "order" ? 0 : undefined;
    } else if (section.numberFields.includes(field)) {
      value = Number(value);
    }
    data[field] = value;
  }

  const urlFields = [...section.mediaFields, ...(section.fields.includes("filmUrl") ? ["filmUrl"] : [])];
  const details = {};
  for (const field of urlFields) {
    const value = data[field];
    if (value !== undefined && !(typeof value === "string" && URL_LIKE.test(value))) {
      details[field] = "Use a link starting with https:// or a site path starting with /.";
    }
  }
  if (Object.keys(details).length) throw new ApiError(400, "Some fields need attention.", details);

  if (section.hasVideo && Object.hasOwn(data, "videoUrl")) {
    if (data.videoUrl) {
      const type = detectVideoType(data.videoUrl);
      data.videoType = type;
      data.videoUrl = toEmbedUrl(data.videoUrl, type);
    } else {
      data.videoType = undefined;
    }
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/* Handlers                                                                   */
/* -------------------------------------------------------------------------- */

/** POST /api/admin/verify — lets the admin panel check a passcode. */
export const verifyPasscode = (_req, res) => res.json({ ok: true });

/** POST /api/admin/:section */
export const createItem = asyncHandler(async (req, res) => {
  const section = getSection(req.params.section);
  const data = normalizePayload(section, req.body);

  if (section.slugSource) {
    if (data.slug) {
      // The admin picked a slug: it must be free (don't silently rename it).
      data.slug = slugify(data.slug);
      if (await section.Model.exists({ slug: data.slug })) {
        throw new ApiError(409, `The slug "${data.slug}" is already used by another item in ${section.label}.`);
      }
    } else {
      data.slug = await uniqueSlug(section.Model, slugify(data[section.slugSource]));
    }
    if (section.Model.schema.path("filmUrl") && !data.filmUrl) {
      data.filmUrl = "/films";
    }
  }

  const doc = await section.Model.create(data);
  res.status(201).json(doc);
});

/** PUT /api/admin/:section/:id */
export const updateItem = asyncHandler(async (req, res) => {
  const section = getSection(req.params.section);
  const doc = await findOr404(section, req.params.id);
  const mediaBefore = collectMedia(section, doc);
  const data = normalizePayload(section, req.body);

  if (Object.hasOwn(data, "slug")) {
    if (!data.slug) {
      delete data.slug; // a slug can't be blanked out
    } else {
      data.slug = slugify(data.slug);
      const taken = await section.Model.exists({ slug: data.slug, _id: { $ne: doc._id } });
      if (taken) throw new ApiError(409, `The slug "${data.slug}" is already used by another item in ${section.label}.`);
    }
  }

  doc.set(data); // fields set to undefined are removed from the document
  await doc.save();

  // Files that were replaced or removed by this edit are no longer needed.
  const mediaAfter = collectMedia(section, doc);
  await cleanupMedia(mediaBefore.filter((url) => !mediaAfter.includes(url)));

  res.json(doc);
});

/** DELETE /api/admin/:section/:id */
export const deleteItem = asyncHandler(async (req, res) => {
  const section = getSection(req.params.section);
  const doc = await findOr404(section, req.params.id);
  const media = collectMedia(section, doc);

  await doc.deleteOne();
  await cleanupMedia(media);

  res.json({ deleted: true, id: req.params.id });
});

/** DELETE /api/admin/gratitude — removes every review and its uploaded image. */
export const deleteAllGratitude = asyncHandler(async (_req, res) => {
  const section = SECTIONS.gratitude;
  const docs = await section.Model.find();
  const media = docs.flatMap((doc) => collectMedia(section, doc));
  const result = await section.Model.deleteMany({});

  await cleanupMedia(media);
  res.json({ deleted: result.deletedCount });
});
