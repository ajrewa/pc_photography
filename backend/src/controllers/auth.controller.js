const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Admin = require("../models/Admin");
const { generateToken } = require("../utils/token");

// @route  POST /api/v1/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !admin.isActive) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  admin.lastLoginAt = new Date();
  await admin.save({ validateBeforeSave: false });

  const token = generateToken({ id: admin._id, role: admin.role });

  new ApiResponse(200, { admin: admin.toSafeObject(), token }, "Logged in successfully").send(res);
});

// @route  POST /api/v1/auth/register
// @access Private (superadmin only — see routes)
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) {
    throw ApiError.conflict("An admin with this email already exists");
  }

  const admin = await Admin.create({ name, email, password, role });

  new ApiResponse(201, admin.toSafeObject(), "Admin account created").send(res);
});

// @route  GET /api/v1/auth/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  new ApiResponse(200, req.admin, "Current admin profile").send(res);
});

// @route  PUT /api/v1/auth/password
// @access Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin._id).select("+password");
  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest("Current password is incorrect");
  }

  admin.password = newPassword;
  await admin.save();

  new ApiResponse(200, null, "Password updated successfully").send(res);
});

// @route  POST /api/v1/auth/logout
// @access Private
const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token");
  new ApiResponse(200, null, "Logged out").send(res);
});

module.exports = { login, register, getMe, updatePassword, logout };
