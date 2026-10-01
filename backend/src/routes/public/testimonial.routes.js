const express = require("express");
const { getPublishedTestimonials } = require("../../controllers/testimonial.controller");

const router = express.Router();

router.get("/", getPublishedTestimonials);

module.exports = router;
