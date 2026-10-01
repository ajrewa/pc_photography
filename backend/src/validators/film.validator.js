const { body, param } = require("express-validator");
const { CATEGORIES } = require("../models/Film");

const createFilmValidator = [
  body("couple").trim().notEmpty().withMessage("Couple name is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("eventDate").isISO8601().withMessage("eventDate must be a valid date"),
  body("teaser").trim().notEmpty().withMessage("Teaser is required").isLength({ max: 400 }),
  body("category").isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(", ")}`),
  body("coverImage").trim().notEmpty().withMessage("coverImage is required"),
  body("gallery").optional().isArray().withMessage("gallery must be an array of image URLs"),
  body("videoUrl").optional().isURL().withMessage("videoUrl must be a valid URL"),
  body("isFeatured").optional().isBoolean(),
  body("isPublished").optional().isBoolean(),
];

const updateFilmValidator = [
  body("couple").optional().trim().notEmpty(),
  body("location").optional().trim().notEmpty(),
  body("eventDate").optional().isISO8601(),
  body("teaser").optional().trim().isLength({ max: 400 }),
  body("category").optional().isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(", ")}`),
  body("coverImage").optional().trim().notEmpty(),
  body("gallery").optional().isArray(),
  body("videoUrl").optional().isURL(),
  body("isFeatured").optional().isBoolean(),
  body("isPublished").optional().isBoolean(),
];

const mongoIdParam = (name = "id") =>
  param(name).isMongoId().withMessage(`${name} must be a valid Mongo ID`);

module.exports = { createFilmValidator, updateFilmValidator, mongoIdParam };
