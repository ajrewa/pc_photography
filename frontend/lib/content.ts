// export type Media = {
//   image: string;
//   videoUrl?: string;
//   videoType?: "file" | "youtube" | "vimeo";
// };

// export type ContentFilm = Media & {
//   slug: string;
//   couple: string;
//   location: string;
//   date: string;
//   teaser: string;
//   category: string;
//   thumbnail?: string;
// };

// export type IndiaFilm = {
//   id: string;
//   couple: string;
//   slug: string;
//   location: string;
//   city: string;
//   state: string;
//   date: string;
//   latitude: number;
//   longitude: number;
//   image: string;
//   filmUrl: string;
// };

// export type GratitudeNote = {
//   quote: string;
//   author: string;
//   role: string;
//   image: string;
// };

// export type SiteContent = {
//   hero: ContentFilm[];
//   films: ContentFilm[];
//   india: IndiaFilm[];
//   gratitude: GratitudeNote[];
// };

export type Media = {
  image: string;
  videoUrl?: string;
  videoType?: "file" | "youtube" | "vimeo";
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

export type FilmReview = {
  reviewer: string;
  relationship?: string;
  quote: string;
  image?: string;
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
