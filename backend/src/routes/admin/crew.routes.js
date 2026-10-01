const express = require("express");
const {
  adminGetCrew,
  adminGetCrewMember,
  createCrewMember,
  updateCrewMember,
  deleteCrewMember,
} = require("../../controllers/crew.controller");
const { createCrewValidator, updateCrewValidator } = require("../../validators/crew.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", adminGetCrew);
router.get("/:id", mongoIdParam(), validate, adminGetCrewMember);
router.post("/", createCrewValidator, validate, createCrewMember);
router.put("/:id", mongoIdParam(), updateCrewValidator, validate, updateCrewMember);
router.delete("/:id", mongoIdParam(), validate, deleteCrewMember);

module.exports = router;
