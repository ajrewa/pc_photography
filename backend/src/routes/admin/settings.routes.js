const express = require("express");
const { adminGetSettings, updateSettings } = require("../../controllers/settings.controller");
const { body } = require("express-validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

const updateSettingsValidator = [
  body("weddingsFilmed").optional().isInt({ min: 0 }),
  body("countriesCovered").optional().isInt({ min: 0 }),
  body("yearsActive").optional().isInt({ min: 0 }),
  body("contactEmail").optional().isEmail(),
  body("contactPhone").optional().trim(),
  body("address").optional().trim(),
  body("heroTagline").optional().trim(),
  body("socials.instagram").optional().trim(),
  body("socials.youtube").optional().trim(),
  body("socials.facebook").optional().trim(),
];

router.get("/", adminGetSettings);
router.put("/", updateSettingsValidator, validate, updateSettings);

module.exports = router;
