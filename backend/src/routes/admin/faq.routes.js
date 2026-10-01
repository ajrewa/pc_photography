const express = require("express");
const { adminGetFaqs, adminGetFaq, createFaq, updateFaq, deleteFaq } = require("../../controllers/faq.controller");
const { createFaqValidator, updateFaqValidator } = require("../../validators/faq.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", adminGetFaqs);
router.get("/:id", mongoIdParam(), validate, adminGetFaq);
router.post("/", createFaqValidator, validate, createFaq);
router.put("/:id", mongoIdParam(), updateFaqValidator, validate, updateFaq);
router.delete("/:id", mongoIdParam(), validate, deleteFaq);

module.exports = router;
