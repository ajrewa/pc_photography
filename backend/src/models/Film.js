import mongoose from "mongoose";
import { cleanJson, required } from "./cleanJson.js";

/** Films shown on the home page and their /films/[slug] pages. */
const filmSchema = new mongoose.Schema(
  {
    slug: { type: String, required: required("Slug"), unique: true, lowercase: true, trim: true },
    couple: { type: String, required: required("Couple"), trim: true, maxlength: 120 },
    location: { type: String, required: required("Location"), trim: true, maxlength: 120 },
    date: { type: String, required: required("Date"), trim: true, maxlength: 60 },
    teaser: { type: String, required: required("Teaser"), trim: true, maxlength: 600 },
    category: { type: String, required: required("Category"), trim: true, maxlength: 60 },
    image: { type: String, required: required("Cover image"), trim: true },
    thumbnail: { type: String, trim: true },
    videoUrl: { type: String, trim: true },
    videoType: { type: String, enum: ["file", "youtube", "vimeo"] },
    trailerUrl: { type: String, trim: true },
    galleryImages: { type: [String], default: [] },
    btsImages: { type: [String], default: [] },
    coupleStory: { type: String, trim: true, maxlength: 10000 },
    btsDescription: { type: String, trim: true, maxlength: 10000 },
    filmReviews: [{
      reviewer: { type: String, required: true, trim: true, maxlength: 120 },
      relationship: { type: String, trim: true, maxlength: 80 },
      quote: { type: String, required: true, trim: true, maxlength: 1500 },
      image: { type: String, trim: true },
    }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cleanJson(filmSchema);

export const Film = mongoose.model("Film", filmSchema);
