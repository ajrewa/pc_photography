const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    names: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    weddingDate: { type: Date },
    weddingLocation: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 2000 },
    source: { type: String, default: "website" },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "booked", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Enquiry", enquirySchema);
