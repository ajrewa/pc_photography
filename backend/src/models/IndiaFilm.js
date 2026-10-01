import mongoose from "mongoose";
import { cleanJson, required } from "./cleanJson.js";

/** Pins on the "Our weddings across India" map. */
const indiaFilmSchema = new mongoose.Schema(
  {
    slug: { type: String, required: required("Slug"), unique: true, lowercase: true, trim: true },
    couple: { type: String, required: required("Couple"), trim: true, maxlength: 120 },
    location: { type: String, required: required("Location"), trim: true, maxlength: 120 },
    city: { type: String, required: required("City"), trim: true, maxlength: 80 },
    state: { type: String, required: required("State"), trim: true, maxlength: 80 },
    date: { type: String, required: required("Date"), trim: true, maxlength: 60 },
    latitude: {
      type: Number,
      required: required("Latitude"),
      min: [-90, "Latitude must be between -90 and 90."],
      max: [90, "Latitude must be between -90 and 90."],
    },
    longitude: {
      type: Number,
      required: required("Longitude"),
      min: [-180, "Longitude must be between -180 and 180."],
      max: [180, "Longitude must be between -180 and 180."],
    },
    image: { type: String, required: required("Thumbnail"), trim: true },
    filmUrl: { type: String, required: required("Film page"), trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cleanJson(indiaFilmSchema);

export const IndiaFilm = mongoose.model("IndiaFilm", indiaFilmSchema);
