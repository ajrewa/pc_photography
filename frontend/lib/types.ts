import type { LucideIcon } from "lucide-react";
import type { AdminFieldKind, ContentSection, JourneySide, UploadType, VideoType } from "@/lib/enums";

export type Media = {
  image: string;
  videoUrl?: string;
  videoType?: VideoType;
};

export type FilmReview = {
  reviewer: string;
  relationship?: string;
  quote: string;
  image?: string;
};

export type ContentFilm = Media & {
  id?: string;
  order?: number;
  slug: string;
  couple: string;
  location: string;
  date: string;
  teaser: string;
  category: string;
  thumbnail?: string;
  trailerUrl?: string;
  galleryImages?: string[];
  btsImages?: string[];
  coupleStory?: string;
  btsDescription?: string;
  filmReviews?: FilmReview[];
};

export type IndiaFilm = {
  id: string;
  couple: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  date: string;
  latitude: number;
  longitude: number;
  image: string;
  filmUrl: string;
  order?: number;
};

export type GratitudeNote = {
  id?: string;
  order?: number;
  rating?: number;
  quote: string;
  author: string;
  role: string;
  image?: string;
};

export type SiteContent = {
  hero: ContentFilm[];
  films: ContentFilm[];
  india: IndiaFilm[];
  gratitude: GratitudeNote[];
};

export type FieldConfig = {
  name: string;
  label: string;
  kind: AdminFieldKind;
  required?: boolean;
  placeholder?: string;
  help?: string;
  half?: boolean;
  suggestCategories?: boolean;
};

export type AdminItem = { id: string } & Record<string, unknown>;

export type SectionConfig = {
  key: ContentSection;
  tab: string;
  singular: string;
  description: string;
  fields: FieldConfig[];
  title: (item: AdminItem) => string;
  lines: (item: AdminItem) => string[];
  thumb: (item: AdminItem) => string | undefined;
};

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type UploadResult = {
  url: string;
  type: UploadType;
  size: number;
};

export type ReviewPayload = {
  author: string;
  image: string;
  quote: string;
  rating: number;
  role: string;
};

export type StaticFilm = {
  slug: string;
  couple: string;
  location: string;
  date: string;
  teaser: string;
  category: string;
  image: string;
};

export type LegacyFilmCard = {
  date: string;
  location: string;
  title: string;
  image: string;
  borderColor: string;
  featured?: boolean;
};

export type FilmCategory = {
  slug: string;
  label: string;
  films: StaticFilm[];
};

export type WeddingFilm = IndiaFilm;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
};

export type Booking = {
  start: string;
  end: string;
  couple: string;
  location: string;
  type: string;
};

export type JourneyItem = {
  year: string;
  title: string;
  location: string;
  description: string;
  image: string;
  side: JourneySide;
};
