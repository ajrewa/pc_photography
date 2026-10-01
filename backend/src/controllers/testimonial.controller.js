const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Testimonial = require("../models/Testimonial");

const getPublishedTestimonials = asyncHandler(async (_req, res) => {
  const testimonials = await Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
  new ApiResponse(200, testimonials, "Testimonials fetched").send(res);
});

const adminGetTestimonials = asyncHandler(async (_req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  new ApiResponse(200, testimonials, "Testimonials fetched").send(res);
});

const adminGetTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw ApiError.notFound("Testimonial not found");
  new ApiResponse(200, testimonial, "Testimonial fetched").send(res);
});

const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  new ApiResponse(201, testimonial, "Testimonial created").send(res);
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) throw ApiError.notFound("Testimonial not found");
  new ApiResponse(200, testimonial, "Testimonial updated").send(res);
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw ApiError.notFound("Testimonial not found");
  new ApiResponse(200, null, "Testimonial deleted").send(res);
});

module.exports = {
  getPublishedTestimonials,
  adminGetTestimonials,
  adminGetTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
