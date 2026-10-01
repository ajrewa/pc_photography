const { body } = require("express-validator");

const createCrewValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("photo").trim().notEmpty().withMessage("Photo is required"),
  body("bio").optional().trim(),
  body("order").optional().isInt(),
  body("isActive").optional().isBoolean(),
];

const updateCrewValidator = [
  body("name").optional().trim().notEmpty(),
  body("role").optional().trim().notEmpty(),
  body("photo").optional().trim().notEmpty(),
  body("bio").optional().trim(),
  body("order").optional().isInt(),
  body("isActive").optional().isBoolean(),
];

module.exports = { createCrewValidator, updateCrewValidator };
