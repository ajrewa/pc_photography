import mongoose from "mongoose";
import { cleanJson, required } from "./cleanJson.js";

/** Full-screen slides in the carousel at the top of the home page. */
const heroSlideSchema = new mongoose.Schema(
  {
    slug: { type: String, required: required("Slug"), unique: true, lowercase: true, trim: true },
    couple: { type: String, required: required("Couple"), trim: true, maxlength: 120 },
    location: { type: String, required: required("Location"), trim: true, maxlength: 120 },
    date: { type: String, required: required("Date"), trim: true, maxlength: 60 },
    teaser: { type: String, required: required("Teaser"), trim: true, maxlength: 600 },
    category: { type: String, required: required("Category"), trim: true, maxlength: 60 },
    image: { type: String, required: required("Cover image"), trim: true },
    videoUrl: { type: String, trim: true },
    videoType: { type: String, enum: ["file", "youtube", "vimeo"] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cleanJson(heroSlideSchema);

export const HeroSlide = mongoose.model("HeroSlide", heroSlideSchema);
