const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
  {
    singleton: { type: String, default: "main", unique: true },
    weddingsFilmed: { type: Number, default: 260 },
    countriesCovered: { type: Number, default: 31 },
    yearsActive: { type: Number, default: 9 },
    contactEmail: { type: String, default: "hello@theweddingfilmer.com" },
    contactPhone: { type: String, default: "+91 98765 43210" },
    address: { type: String, default: "Mumbai · Available worldwide" },
    socials: {
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      facebook: { type: String, default: "" },
    },
    heroTagline: {
      type: String,
      default: "We film weddings like we're not supposed to be there.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
