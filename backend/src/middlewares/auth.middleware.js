const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { verifyToken } = require("../utils/token");
const Admin = require("../models/Admin");

/**
 * Verifies the Bearer token and attaches the authenticated admin to req.admin.
 */
const protect = asyncHandler(async (req, _res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw ApiError.unauthorized("No auth token provided");
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (err) {
    throw ApiError.unauthorized("Invalid or expired token");
  }

  const admin = await Admin.findById(decoded.id).select("-password");
  if (!admin || !admin.isActive) {
    throw ApiError.unauthorized("Account no longer has access");
  }

  req.admin = admin;
  next();
});

/**
 * Restricts a route to one or more admin roles.
 * Usage: authorize("superadmin")
 */
const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.admin) {
      throw ApiError.unauthorized("Not authorized");
    }
    if (roles.length && !roles.includes(req.admin.role)) {
      throw ApiError.forbidden("You do not have permission to perform this action");
    }
    next();
  };

module.exports = { protect, authorize };
