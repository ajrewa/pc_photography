const express = require("express");
const {
  adminGetEnquiries,
  adminGetEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require("../../controllers/enquiry.controller");
const { updateEnquiryValidator } = require("../../validators/enquiry.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", adminGetEnquiries);
router.get("/:id", mongoIdParam(), validate, adminGetEnquiry);
router.patch("/:id", mongoIdParam(), updateEnquiryValidator, validate, updateEnquiry);
router.delete("/:id", mongoIdParam(), validate, deleteEnquiry);

module.exports = router;
