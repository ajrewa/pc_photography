import mongoose from "mongoose";
import { cleanJson, required } from "./cleanJson.js";

/** "Notes of gratitude" testimonials on the home page. */
const gratitudeNoteSchema = new mongoose.Schema(
  {
    quote: { type: String, required: required("Quote"), trim: true, maxlength: 1500 },
    author: { type: String, required: required("Couple"), trim: true, maxlength: 120 },
    role: { type: String, required: required("Role"), trim: true, maxlength: 60 },
    image: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cleanJson(gratitudeNoteSchema);

export const GratitudeNote = mongoose.model("GratitudeNote", gratitudeNoteSchema);
