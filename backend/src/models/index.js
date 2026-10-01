import { HeroSlide } from "./HeroSlide.js";
import { Film } from "./Film.js";
import { IndiaFilm } from "./IndiaFilm.js";
import { GratitudeNote } from "./GratitudeNote.js";

/**
 * One entry per content section. The keys are the same ones the frontend reads
 * from GET /api/content (hero, films, india, gratitude), and double as the
 * :section parameter of the admin routes.
 *
 *  fields       - the only body properties the admin API will accept (allow-list)
 *  mediaFields  - properties that hold an image/video URL (used to clean up files in B2)
 *  numberFields - properties that must be coerced from strings to numbers
 *  slugSource   - if set, the section has a unique `slug`, generated from this field
 *  hasVideo     - `videoUrl` is normalised and `videoType` is derived from it
 */
export const SECTIONS = {
  hero: {
    label: "Hero slides",
    Model: HeroSlide,
    fields: ["slug", "couple", "location", "date", "teaser", "category", "image", "videoUrl", "order"],
    mediaFields: ["image", "videoUrl"],
    numberFields: ["order"],
    slugSource: "couple",
    hasVideo: true,
  },
  films: {
    label: "Films",
    Model: Film,
    fields: ["slug", "couple", "location", "date", "teaser", "category", "image", "thumbnail", "videoUrl", "order"],
    mediaFields: ["image", "thumbnail", "videoUrl"],
    numberFields: ["order"],
    slugSource: "couple",
    hasVideo: true,
  },
  india: {
    label: "India map",
    Model: IndiaFilm,
    fields: ["slug", "couple", "location", "city", "state", "date", "latitude", "longitude", "image", "filmUrl", "order"],
    mediaFields: ["image"],
    numberFields: ["latitude", "longitude", "order"],
    slugSource: "couple",
    hasVideo: false,
  },
  gratitude: {
    label: "Gratitude notes",
    Model: GratitudeNote,
    fields: ["quote", "author", "role", "image", "order"],
    mediaFields: ["image"],
    numberFields: ["order"],
    slugSource: null,
    hasVideo: false,
  },
};

export const sectionNames = Object.keys(SECTIONS);

/** Display order used everywhere: explicit `order` first, then newest first. */
export const DISPLAY_SORT = { order: 1, createdAt: -1 };
