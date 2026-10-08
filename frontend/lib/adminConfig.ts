import type { SiteContent } from "@/lib/content";

export type SectionKey = keyof SiteContent;

/** A record as returned by the API. Every record has an `id`. */
export type AdminItem = { id: string } & Record<string, unknown>;

export type FieldKind = "text" | "textarea" | "number" | "image" | "video";

export type FieldConfig = {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** Sit next to another half-width field on wide screens. */
  half?: boolean;
  /** Offer the categories already used by films as suggestions. */
  suggestCategories?: boolean;
};

export type SectionConfig = {
  key: SectionKey;
  tab: string;
  /** Used in buttons and messages: "Add film", "Film added." */
  singular: string;
  description: string;
  fields: FieldConfig[];
  title: (item: AdminItem) => string;
  lines: (item: AdminItem) => string[];
  thumb: (item: AdminItem) => string | undefined;
};

const str = (value: unknown) => (typeof value === "string" ? value : "");

const orderField: FieldConfig = {
  name: "order",
  label: "Display order",
  kind: "number",
  half: true,
  placeholder: "0",
  help: "Lower numbers show first. Leave at 0 to show the newest first.",
};

const slugField = (help: string): FieldConfig => ({
  name: "slug",
  label: "Web address name",
  kind: "text",
  half: true,
  placeholder: "Leave blank to create it from the couple's names",
  help,
});

const filmBasics: FieldConfig[] = [
  { name: "couple", label: "Couple", kind: "text", required: true, half: true, placeholder: "Arya & Federico" },
  { name: "location", label: "Location", kind: "text", required: true, half: true, placeholder: "Lake Como, Italy" },
  { name: "date", label: "Wedding date", kind: "text", required: true, half: true, placeholder: "June 2025", help: "Shown exactly as you type it." },
  { name: "category", label: "Category", kind: "text", required: true, half: true, placeholder: "Destination", suggestCategories: true },
  { name: "teaser", label: "Teaser", kind: "textarea", required: true, help: "One or two sentences about the wedding." },
];

export const SECTIONS: SectionConfig[] = [
  {
    key: "hero",
    tab: "Hero slides",
    singular: "hero slide",
    description: "The full-screen slides at the top of the home page.",
    fields: [
      ...filmBasics,
      { name: "image", label: "Cover image", kind: "image", required: true, help: "Fills the slide, and shows while a video loads." },
      { name: "videoUrl", label: "Background video", kind: "video", help: "Optional. An uploaded MP4 plays silently behind the text." },
      slugField("Must match a film's web address name for the film page link to work."),
      orderField,
    ],
    title: (item) => str(item.couple),
    lines: (item) => [str(item.location), str(item.date)],
    thumb: (item) => str(item.image) || undefined,
  },
  {
    key: "films",
    tab: "Films",
    singular: "film",
    description: "Films on the site. Each film gets a page at /films/{slug}.",
    fields: [
      ...filmBasics,
      { name: "image", label: "Cover image", kind: "image", required: true, help: "Shown on the film page." },
      { name: "thumbnail", label: "Card thumbnail", kind: "image", help: "Optional. Used on the film grid. Falls back to the cover image." },
      { name: "videoUrl", label: "Film", kind: "video", help: "Upload a video file, or paste a YouTube or Vimeo link." },
      slugField("Part of the film's page address. Changing it breaks links that already exist."),
      orderField,
    ],
    title: (item) => str(item.couple),
    lines: (item) => [str(item.location), str(item.category)],
    thumb: (item) => str(item.thumbnail) || str(item.image) || undefined,
  },
  {
    key: "india",
    tab: "India map",
    singular: "map pin",
    description: "The pins on “Our weddings across India”.",
    fields: [
      { name: "couple", label: "Couple", kind: "text", required: true, half: true, placeholder: "RAKUL & JACKKY" },
      { name: "location", label: "Venue or area", kind: "text", required: true, half: true, placeholder: "Goa" },
      { name: "city", label: "City", kind: "text", required: true, half: true, placeholder: "Panaji" },
      { name: "state", label: "State", kind: "text", required: true, half: true, placeholder: "Goa" },
      { name: "date", label: "Wedding date", kind: "text", required: true, half: true, placeholder: "April 2025" },
      { name: "latitude", label: "Latitude", kind: "number", required: true, half: true, placeholder: "15.4909", help: "In Google Maps, right-click the spot and click the numbers to copy them." },
      { name: "longitude", label: "Longitude", kind: "number", required: true, half: true, placeholder: "73.8278" },
      { name: "image", label: "Thumbnail", kind: "image", required: true },
      { name: "filmUrl", label: "Film page", kind: "text", placeholder: "/films", help: "Where “View film” goes. Leave blank to link to the films page." },
      slugField("Used to build the film page address."),
      orderField,
    ],
    title: (item) => str(item.couple),
    lines: (item) => [`${str(item.city)}, ${str(item.state)}`, str(item.date)],
    thumb: (item) => str(item.image) || undefined,
  },
  {
    key: "gratitude",
    tab: "Gratitude notes",
    singular: "note",
    description: "The testimonials in “Notes of gratitude” on the home page.",
    fields: [
      { name: "quote", label: "Quote", kind: "textarea", required: true },
      { name: "author", label: "Couple", kind: "text", required: true, half: true, placeholder: "Priya & Raghav" },
      { name: "role", label: "Role", kind: "text", required: true, half: true, placeholder: "PC Bride" },
      { name: "rating", label: "Rating (1–5)", kind: "number", half: true, placeholder: "5" },
      { name: "image", label: "Photo", kind: "image" },
      orderField,
    ],
    title: (item) => str(item.author),
    lines: (item) => [str(item.role), str(item.quote).slice(0, 90) + (str(item.quote).length > 90 ? "…" : "")],
    thumb: (item) => str(item.image) || undefined,
  },
];

export const PASSCODE_STORAGE_KEY = "pc-admin-passcode";
