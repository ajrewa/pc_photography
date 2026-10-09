import { randomUUID } from "node:crypto";
import { AvailabilitySlot } from "../models/AvailabilitySlot.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value) {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function dateRange(startDate, endDate) {
  if (!isValidDate(startDate) || !isValidDate(endDate) || startDate > endDate) {
    throw new ApiError(400, "Choose a valid start and end date.");
  }

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const days = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
  if (days > 366) throw new ApiError(400, "A booking cannot be longer than 366 days.");

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(start.getTime() + index * 86_400_000);
    return date.toISOString().slice(0, 10);
  });
}

function requiredText(value, field, maxLength) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > maxLength) {
    throw new ApiError(400, `${field} is required and must be no longer than ${maxLength} characters.`);
  }
  return value.trim();
}

async function createBooking({ startDate, endDate, source, name, email = "", location = "" }) {
  const dates = dateRange(startDate, endDate);
  const bookingId = randomUUID();
  try {
    await AvailabilitySlot.insertMany(
      dates.map((date) => ({
        date,
        bookingId,
        startDate,
        endDate,
        source,
        name,
        email,
        location,
      }))
    );
  } catch (error) {
    await AvailabilitySlot.deleteMany({ bookingId });
    if (error?.code === 11000) {
      throw new ApiError(409, "One or more selected dates are no longer available.");
    }
    throw error;
  }
  return bookingId;
}

export const getAvailability = asyncHandler(async (_req, res) => {
  const slots = await AvailabilitySlot.find().select("date -_id").sort({ date: 1 }).lean();
  res.json({ bookedDates: slots.map((slot) => slot.date) });
});

export const bookDates = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body ?? {};
  if (startDate < new Date().toISOString().slice(0, 10)) {
    throw new ApiError(400, "Bookings must start today or later.");
  }

  const name = requiredText(req.body?.name, "Name", 120);
  const email = requiredText(req.body?.email, "Email", 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ApiError(400, "Enter a valid email address.");
  const location = typeof req.body?.location === "string" ? req.body.location.trim().slice(0, 160) : "";

  const bookingId = await createBooking({ startDate, endDate, source: "user", name, email, location });
  res.status(201).json({ bookingId, message: "Your dates have been booked." });
});

export const adminGetAvailability = asyncHandler(async (_req, res) => {
  const slots = await AvailabilitySlot.find()
    .select("bookingId startDate endDate source name email location createdAt -_id")
    .sort({ startDate: 1 })
    .lean();
  const bookings = [...new Map(slots.map((slot) => [slot.bookingId, slot])).values()];
  res.json({ bookings });
});

export const adminBookDates = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body ?? {};
  const name = typeof req.body?.name === "string" && req.body.name.trim()
    ? requiredText(req.body.name, "Name", 120)
    : "Admin booking";
  const location = typeof req.body?.location === "string" ? req.body.location.trim().slice(0, 160) : "";

  const bookingId = await createBooking({ startDate, endDate, source: "admin", name, location });
  res.status(201).json({ bookingId, message: "Dates marked as booked." });
});

export const adminRemoveBooking = asyncHandler(async (req, res) => {
  const result = await AvailabilitySlot.deleteMany({ bookingId: req.params.bookingId });
  if (!result.deletedCount) throw new ApiError(404, "Booking not found.");
  res.json({ message: "Booking removed.", deletedDates: result.deletedCount });
});
