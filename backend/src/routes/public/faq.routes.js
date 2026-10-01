const express = require("express");
const { getPublishedFaqs } = require("../../controllers/faq.controller");

const router = express.Router();

router.get("/", getPublishedFaqs);

module.exports = router;
