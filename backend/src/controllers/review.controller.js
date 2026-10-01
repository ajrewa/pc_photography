import { GratitudeNote } from "../models/GratitudeNote.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitReview = asyncHandler(async (req, res) => {
  const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
  const quote = typeof body.quote === "string" ? body.quote.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const order = body.order === "" || body.order === undefined ? 0 : Number(body.order);
  const details = {};

  if (!quote) details.quote = "Tell us about your experience.";
  if (!author) details.author = "Enter your name or couple name.";
  if (!role) details.role = "Choose how you were connected to the wedding.";
  if (!image || !/^https?:\/\//i.test(image)) details.image = "Add a valid image URL.";
  if (!Number.isFinite(order)) details.order = "Enter a valid display order.";
  if (Object.keys(details).length) throw new ApiError(400, "Some fields need attention.", details);

  const review = await GratitudeNote.create({ quote, author, role, image, order });
  res.status(201).json({ message: "Thank you! Your review has been submitted.", review });
});