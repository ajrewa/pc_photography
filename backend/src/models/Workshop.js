const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    totalSeats: { type: Number, required: true, default: 12 },
    seatsBooked: { type: Number, default: 0 },
    description: { type: String, trim: true },
    coverImage: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

workshopSchema.virtual("seatsLeft").get(function seatsLeft() {
  return Math.max(this.totalSeats - this.seatsBooked, 0);
});

workshopSchema.set("toJSON", { virtuals: true });
workshopSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Workshop", workshopSchema);
