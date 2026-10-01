const { body } = require("express-validator");

const TAGS = ["Advice", "Press", "Process", "News"];

const createBlogValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("excerpt").trim().notEmpty().withMessage("Excerpt is required").isLength({ max: 300 }),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("coverImage").trim().notEmpty().withMessage("coverImage is required"),
  body("tag").optional().isIn(TAGS).withMessage(`tag must be one of: ${TAGS.join(", ")}`),
  body("isPublished").optional().isBoolean(),
];

const updateBlogValidator = [
  body("title").optional().trim().notEmpty(),
  body("excerpt").optional().trim().isLength({ max: 300 }),
  body("content").optional().trim().notEmpty(),
  body("coverImage").optional().trim().notEmpty(),
  body("tag").optional().isIn(TAGS),
  body("isPublished").optional().isBoolean(),
];

module.exports = { createBlogValidator, updateBlogValidator, TAGS };
