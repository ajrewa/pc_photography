import { rateLimit } from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";

const tooMany = (message) => (_req, _res, next) => next(new ApiError(429, message));

/** Generous ceiling for everything under /api/admin (edits, uploads...). */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany("Too many requests. Try again in a few minutes."),
});

/**
 * Slows down passcode guessing: only responses with a 401 count towards the
 * limit, so normal admin work never gets throttled by it.
 */
export const wrongPasscodeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  requestWasSuccessful: (_req, res) => res.statusCode !== 401,
  handler: tooMany("Too many wrong passcodes. Try again in 15 minutes."),
});

export const publicReviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: tooMany("Too many review requests. Please try again later."),
});
