const express = require("express");
const {
  adminGetTestimonials,
  adminGetTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../../controllers/testimonial.controller");
const {
  createTestimonialValidator,
  updateTestimonialValidator,
} = require("../../validators/testimonial.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", adminGetTestimonials);
router.get("/:id", mongoIdParam(), validate, adminGetTestimonial);
router.post("/", createTestimonialValidator, validate, createTestimonial);
router.put("/:id", mongoIdParam(), updateTestimonialValidator, validate, updateTestimonial);
router.delete("/:id", mongoIdParam(), validate, deleteTestimonial);

module.exports = router;
