const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true, trim: true, maxlength: 600 },
    authorName: { type: String, required: true, trim: true },
    authorDetail: { type: String, trim: true },
    authorPhoto: { type: String },
    relatedFilm: { type: mongoose.Schema.Types.ObjectId, ref: "Film" },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
