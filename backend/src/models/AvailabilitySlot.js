import mongoose from "mongoose";

const availabilitySlotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    bookingId: { type: String, required: true, index: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    source: { type: String, required: true, enum: ["user", "admin"] },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, trim: true, maxlength: 254 },
    location: { type: String, trim: true, maxlength: 160 },
  },
  { timestamps: true }
);

availabilitySlotSchema.index({ date: 1 }, { unique: true });

export const AvailabilitySlot = mongoose.model("AvailabilitySlot", availabilitySlotSchema);
