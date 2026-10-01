const express = require("express");
const { getUpcomingWorkshops, applyToWorkshop } = require("../../controllers/workshop.controller");
const { applyToWorkshopValidator } = require("../../validators/workshop.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", getUpcomingWorkshops);
router.post("/:id/apply", mongoIdParam(), applyToWorkshopValidator, validate, applyToWorkshop);

module.exports = router;
