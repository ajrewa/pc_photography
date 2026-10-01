const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Admin = require("../models/Admin");

// @route  GET /api/v1/admin/admins
// @access Private (superadmin)
const listAdmins = asyncHandler(async (_req, res) => {
  const admins = await Admin.find().sort({ createdAt: -1 });
  new ApiResponse(200, admins, "Admin accounts fetched").send(res);
});

// @route  PATCH /api/v1/admin/admins/:id
// @access Private (superadmin)
const updateAdmin = asyncHandler(async (req, res) => {
  const { role, isActive, name } = req.body;

  if (req.params.id === String(req.admin._id) && isActive === false) {
    throw ApiError.badRequest("You cannot deactivate your own account");
  }

  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { ...(role && { role }), ...(typeof isActive === "boolean" && { isActive }), ...(name && { name }) },
    { new: true, runValidators: true }
  );
  if (!admin) throw ApiError.notFound("Admin not found");

  new ApiResponse(200, admin, "Admin account updated").send(res);
});

// @route  DELETE /api/v1/admin/admins/:id
// @access Private (superadmin)
const deleteAdmin = asyncHandler(async (req, res) => {
  if (req.params.id === String(req.admin._id)) {
    throw ApiError.badRequest("You cannot delete your own account");
  }

  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) throw ApiError.notFound("Admin not found");

  new ApiResponse(200, null, "Admin account deleted").send(res);
});

module.exports = { listAdmins, updateAdmin, deleteAdmin };
