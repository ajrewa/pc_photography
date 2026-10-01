const express = require("express");
const rateLimit = require("express-rate-limit");
const { createEnquiry } = require("../../controllers/enquiry.controller");
const { createEnquiryValidator } = require("../../validators/enquiry.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many enquiries sent. Please try again later." },
});

router.post("/", contactLimiter, createEnquiryValidator, validate, createEnquiry);

module.exports = router;
