const { body } = require("express-validator");

const createWorkshopValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("startDate").isISO8601().withMessage("startDate must be a valid date"),
  body("endDate").isISO8601().withMessage("endDate must be a valid date"),
  body("price").isFloat({ min: 0 }).withMessage("price must be a positive number"),
  body("totalSeats").isInt({ min: 1 }).withMessage("totalSeats must be at least 1"),
  body("description").optional().trim(),
  body("coverImage").optional().trim(),
  body("isPublished").optional().isBoolean(),
];

const updateWorkshopValidator = [
  body("title").optional().trim().notEmpty(),
  body("city").optional().trim().notEmpty(),
  body("country").optional().trim().notEmpty(),
  body("startDate").optional().isISO8601(),
  body("endDate").optional().isISO8601(),
  body("price").optional().isFloat({ min: 0 }),
  body("totalSeats").optional().isInt({ min: 1 }),
  body("seatsBooked").optional().isInt({ min: 0 }),
  body("description").optional().trim(),
  body("coverImage").optional().trim(),
  body("isPublished").optional().isBoolean(),
];

const applyToWorkshopValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("portfolioUrl").optional().isURL().withMessage("portfolioUrl must be a valid URL"),
  body("message").optional().isLength({ max: 1000 }),
];

module.exports = { createWorkshopValidator, updateWorkshopValidator, applyToWorkshopValidator };
