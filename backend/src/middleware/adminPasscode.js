import crypto from "node:crypto";
import { ADMIN_PASSCODE } from "../config/admin.js";
import { ApiError } from "../utils/ApiError.js";

// Comparing SHA-256 digests keeps the comparison constant-time and independent of length.
const digest = (value) => crypto.createHash("sha256").update(String(value)).digest();
const expected = digest(ADMIN_PASSCODE);

/**
 * Not user authentication, just a shared passcode check for every /api/admin route.
 * The admin panel sends the passcode in the `x-admin-passcode` header.
 */
export function requirePasscode(req, _res, next) {
  const supplied = req.get("x-admin-passcode") ?? "";
  if (!crypto.timingSafeEqual(digest(supplied), expected)) {
    return next(new ApiError(401, "Incorrect passcode."));
  }
  next();
}
