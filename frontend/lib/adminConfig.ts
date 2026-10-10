import { AdminFieldKind, ContentSection } from "@/lib/enums";
import type { AdminItem, FieldConfig, SectionConfig, SectionKey, SiteContent } from "@/lib/types";

export type { AdminItem, FieldConfig, SectionConfig, SectionKey } from "@/lib/types";

const str = (value: unknown) => (typeof value === "string" ? value : "");

const orderField: FieldConfig = {
  name: "order",
  label: "Display order",
  kind: AdminFieldKind.Number,
  half: true,
  placeholder: "0",
  help: "Lower numbers show first. Leave at 0 to show the newest first.",
};

const slugField = (help: string): FieldConfig => ({
  name: "slug",
  label: "Web address name",
  kind: AdminFieldKind.Text,
  half: true,
  placeholder: "Leave blank to create it from the couple's names",
  help,
});

const filmBasics: FieldConfig[] = [
  { name: "couple", label: "Couple", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Arya & Federico" },
  { name: "location", label: "Location", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Lake Como, Italy" },
  { name: "date", label: "Wedding date", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "June 2025", help: "Shown exactly as you type it." },
  { name: "category", label: "Category", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Destination", suggestCategories: true },
  { name: "teaser", label: "Teaser", kind: AdminFieldKind.Textarea, required: true, help: "One or two sentences about the wedding." },
];

export const SECTIONS: SectionConfig[] = [
  {
    key: ContentSection.Hero,
    tab: "Hero slides",
    singular: "hero slide",
    description: "The full-screen slides at the top of the home page.",
    fields: [
      ...filmBasics,
      { name: "image", label: "Cover image", kind: AdminFieldKind.Image, required: true, help: "Fills the slide, and shows while a video loads." },
      { name: "videoUrl", label: "Background video", kind: AdminFieldKind.Video, help: "Optional. An uploaded MP4 plays silently behind the text." },
      slugField("Must match a film's web address name for the film page link to work."),
      orderField,
    ],
    title: (item) => str(item.couple),
    lines: (item) => [str(item.location), str(item.date)],
    thumb: (item) => str(item.image) || undefined,
  },
  {
    key: ContentSection.Films,
    tab: "Films",
    singular: "film",
    description: "Films on the site. Each film gets a page at /films/{slug}.",
    fields: [
      ...filmBasics,
      { name: "image", label: "Cover image", kind: AdminFieldKind.Image, required: true, help: "Shown on the film page." },
      { name: "thumbnail", label: "Card thumbnail", kind: AdminFieldKind.Image, help: "Optional. Used on the film grid. Falls back to the cover image." },
      { name: "videoUrl", label: "Featured film", kind: AdminFieldKind.Video, help: "Optional uploaded video or YouTube/Vimeo link. This video can play on the wedding detail page." },
      { name: "trailerUrl", label: "YouTube trailer link", kind: AdminFieldKind.Text, placeholder: "https://youtu.be/...", help: "The Watch Trailer button opens this YouTube link in a new tab; the trailer is not embedded in this website." },
      { name: "galleryImages", label: "Wedding gallery images", kind: AdminFieldKind.ImageList, help: "Add as many wedding photos as you like. Upload several at once or paste one image URL per line." },
      { name: "btsImages", label: "Behind-the-scenes images", kind: AdminFieldKind.ImageList, help: "Optional BTS gallery. Upload several at once or paste one image URL per line." },
      { name: "coupleStory", label: "Couple’s journey", kind: AdminFieldKind.Textarea, help: "Write the story in paragraphs. Separate paragraphs with a blank line." },
      { name: "btsDescription", label: "Behind-the-scenes story", kind: AdminFieldKind.Textarea, help: "Describe the moments and people behind the scenes." },
      { name: "filmReviews", label: "Couple & family reviews", kind: AdminFieldKind.FilmReviews, help: "Add separate reviews from the couple and family members, each with their own name and optional photo." },
      slugField("Part of the film's page address. Changing it breaks links that already exist."),
      orderField,
    ],
    title: (item) => str(item.couple),
    lines: (item) => [str(item.location), str(item.category)],
    thumb: (item) => str(item.thumbnail) || str(item.image) || undefined,
  },
  {
    key: ContentSection.India,
    tab: "India map",
    singular: "map pin",
    description: "The pins on “Our weddings across India”.",
    fields: [
      { name: "couple", label: "Couple", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "RAKUL & JACKKY" },
      { name: "location", label: "Venue or area", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Goa" },
      { name: "city", label: "City", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Panaji" },
      { name: "state", label: "State", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Goa" },
      { name: "date", label: "Wedding date", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "April 2025" },
      { name: "latitude", label: "Latitude", kind: AdminFieldKind.Number, required: true, half: true, placeholder: "15.4909", help: "In Google Maps, right-click the spot and click the numbers to copy them." },
      { name: "longitude", label: "Longitude", kind: AdminFieldKind.Number, required: true, half: true, placeholder: "73.8278" },
      { name: "image", label: "Thumbnail", kind: AdminFieldKind.Image, required: true },
      { name: "filmUrl", label: "Film page", kind: AdminFieldKind.Text, placeholder: "/films", help: "Where “View film” goes. Leave blank to link to the films page." },
      slugField("Used to build the film page address."),
      orderField,
    ],
    title: (item) => str(item.couple),
    lines: (item) => [`${str(item.city)}, ${str(item.state)}`, str(item.date)],
    thumb: (item) => str(item.image) || undefined,
  },
  {
    key: ContentSection.Gratitude,
    tab: "Gratitude notes",
    singular: "note",
    description: "The testimonials in “Notes of gratitude” on the home page.",
    fields: [
      { name: "quote", label: "Quote", kind: AdminFieldKind.Textarea, required: true },
      { name: "author", label: "Couple", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "Priya & Raghav" },
      { name: "role", label: "Role", kind: AdminFieldKind.Text, required: true, half: true, placeholder: "PC Bride" },
      { name: "rating", label: "Rating (1–5)", kind: AdminFieldKind.Number, half: true, placeholder: "5" },
      { name: "image", label: "Photo", kind: AdminFieldKind.Image },
      orderField,
    ],
    title: (item) => str(item.author),
    lines: (item) => [str(item.role), str(item.quote).slice(0, 90) + (str(item.quote).length > 90 ? "…" : "")],
    thumb: (item) => str(item.image) || undefined,
  },
];

export const PASSCODE_STORAGE_KEY = "pc-admin-passcode";
