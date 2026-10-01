const express = require("express");
const {
  adminGetWorkshops,
  adminGetWorkshop,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  adminGetApplications,
  updateApplicationStatus,
} = require("../../controllers/workshop.controller");
const {
  createWorkshopValidator,
  updateWorkshopValidator,
} = require("../../validators/workshop.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const { body } = require("express-validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/applications", adminGetApplications);
router.patch(
  "/applications/:id/status",
  mongoIdParam(),
  body("status").isIn(["pending", "accepted", "waitlisted", "rejected"]),
  validate,
  updateApplicationStatus
);

router.get("/", adminGetWorkshops);
router.get("/:id", mongoIdParam(), validate, adminGetWorkshop);
router.post("/", createWorkshopValidator, validate, createWorkshop);
router.put("/:id", mongoIdParam(), updateWorkshopValidator, validate, updateWorkshop);
router.delete("/:id", mongoIdParam(), validate, deleteWorkshop);

module.exports = router;
