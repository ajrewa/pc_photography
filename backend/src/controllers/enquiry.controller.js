const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Enquiry = require("../models/Enquiry");
const { getPagination, buildMeta } = require("../utils/pagination");

// @route  POST /api/v1/contact
// @access Public
const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  new ApiResponse(201, enquiry, "Thanks — we'll be in touch within 48 hours").send(res);
});

// @route  GET /api/v1/admin/enquiries
// @access Private
const adminGetEnquiries = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const { page, limit, skip } = getPagination(req.query, { defaultLimit: 20 });

  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { names: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  new ApiResponse(200, enquiries, "Enquiries fetched", buildMeta({ page, limit, total })).send(res);
});

// @route  GET /api/v1/admin/enquiries/:id
// @access Private
const adminGetEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) throw ApiError.notFound("Enquiry not found");
  new ApiResponse(200, enquiry, "Enquiry fetched").send(res);
});

// @route  PATCH /api/v1/admin/enquiries/:id
// @access Private
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!enquiry) throw ApiError.notFound("Enquiry not found");
  new ApiResponse(200, enquiry, "Enquiry updated").send(res);
});

// @route  DELETE /api/v1/admin/enquiries/:id
// @access Private
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) throw ApiError.notFound("Enquiry not found");
  new ApiResponse(200, null, "Enquiry deleted").send(res);
});

module.exports = {
  createEnquiry,
  adminGetEnquiries,
  adminGetEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
