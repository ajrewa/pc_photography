const { body } = require("express-validator");

const createTestimonialValidator = [
  body("quote").trim().notEmpty().withMessage("Quote is required").isLength({ max: 600 }),
  body("authorName").trim().notEmpty().withMessage("Author name is required"),
  body("authorDetail").optional().trim(),
  body("authorPhoto").optional().trim(),
  body("relatedFilm").optional().isMongoId(),
  body("order").optional().isInt(),
  body("isPublished").optional().isBoolean(),
];

const updateTestimonialValidator = [
  body("quote").optional().trim().isLength({ max: 600 }),
  body("authorName").optional().trim().notEmpty(),
  body("authorDetail").optional().trim(),
  body("authorPhoto").optional().trim(),
  body("relatedFilm").optional().isMongoId(),
  body("order").optional().isInt(),
  body("isPublished").optional().isBoolean(),
];

module.exports = { createTestimonialValidator, updateTestimonialValidator };
