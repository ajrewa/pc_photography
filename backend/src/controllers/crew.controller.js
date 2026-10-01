const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Crew = require("../models/Crew");

// @route  GET /api/v1/crew
// @access Public
const getActiveCrew = asyncHandler(async (_req, res) => {
  const crew = await Crew.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
  new ApiResponse(200, crew, "Crew fetched").send(res);
});

// @route  GET /api/v1/admin/crew
// @access Private
const adminGetCrew = asyncHandler(async (_req, res) => {
  const crew = await Crew.find().sort({ order: 1, createdAt: 1 });
  new ApiResponse(200, crew, "Crew fetched").send(res);
});

// @route  GET /api/v1/admin/crew/:id
// @access Private
const adminGetCrewMember = asyncHandler(async (req, res) => {
  const member = await Crew.findById(req.params.id);
  if (!member) throw ApiError.notFound("Crew member not found");
  new ApiResponse(200, member, "Crew member fetched").send(res);
});

// @route  POST /api/v1/admin/crew
// @access Private
const createCrewMember = asyncHandler(async (req, res) => {
  const member = await Crew.create(req.body);
  new ApiResponse(201, member, "Crew member added").send(res);
});

// @route  PUT /api/v1/admin/crew/:id
// @access Private
const updateCrewMember = asyncHandler(async (req, res) => {
  const member = await Crew.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!member) throw ApiError.notFound("Crew member not found");
  new ApiResponse(200, member, "Crew member updated").send(res);
});

// @route  DELETE /api/v1/admin/crew/:id
// @access Private
const deleteCrewMember = asyncHandler(async (req, res) => {
  const member = await Crew.findByIdAndDelete(req.params.id);
  if (!member) throw ApiError.notFound("Crew member not found");
  new ApiResponse(200, null, "Crew member deleted").send(res);
});

module.exports = {
  getActiveCrew,
  adminGetCrew,
  adminGetCrewMember,
  createCrewMember,
  updateCrewMember,
  deleteCrewMember,
};
