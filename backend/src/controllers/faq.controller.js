const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const FAQ = require("../models/FAQ");

const getPublishedFaqs = asyncHandler(async (_req, res) => {
  const faqs = await FAQ.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
  new ApiResponse(200, faqs, "FAQs fetched").send(res);
});

const adminGetFaqs = asyncHandler(async (_req, res) => {
  const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
  new ApiResponse(200, faqs, "FAQs fetched").send(res);
});

const adminGetFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) throw ApiError.notFound("FAQ not found");
  new ApiResponse(200, faq, "FAQ fetched").send(res);
});

const createFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.create(req.body);
  new ApiResponse(201, faq, "FAQ created").send(res);
});

const updateFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!faq) throw ApiError.notFound("FAQ not found");
  new ApiResponse(200, faq, "FAQ updated").send(res);
});

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) throw ApiError.notFound("FAQ not found");
  new ApiResponse(200, null, "FAQ deleted").send(res);
});

module.exports = { getPublishedFaqs, adminGetFaqs, adminGetFaq, createFaq, updateFaq, deleteFaq };
