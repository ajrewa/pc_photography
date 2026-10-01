const { body } = require("express-validator");

const createFaqValidator = [
  body("question").trim().notEmpty().withMessage("Question is required"),
  body("answer").trim().notEmpty().withMessage("Answer is required"),
  body("order").optional().isInt(),
  body("isPublished").optional().isBoolean(),
];

const updateFaqValidator = [
  body("question").optional().trim().notEmpty(),
  body("answer").optional().trim().notEmpty(),
  body("order").optional().isInt(),
  body("isPublished").optional().isBoolean(),
];

module.exports = { createFaqValidator, updateFaqValidator };
