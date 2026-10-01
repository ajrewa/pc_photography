const { body } = require("express-validator");

const createEnquiryValidator = [
  body("names").trim().notEmpty().withMessage("Your name(s) are required"),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("phone").optional().trim(),
  body("weddingDate").optional().isISO8601().withMessage("weddingDate must be a valid date"),
  body("weddingLocation").optional().trim(),
  body("message").optional().trim().isLength({ max: 2000 }),
];

const updateEnquiryValidator = [
  body("status").optional().isIn(["new", "contacted", "quoted", "booked", "closed"]),
  body("notes").optional().trim(),
];

module.exports = { createEnquiryValidator, updateEnquiryValidator };
