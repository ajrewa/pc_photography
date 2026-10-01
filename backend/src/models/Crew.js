const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    photo: { type: String, required: true },
    socials: {
      instagram: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crew", crewSchema);
