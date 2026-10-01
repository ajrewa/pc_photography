const express = require("express");
const { body } = require("express-validator");
const { listAdmins, updateAdmin, deleteAdmin } = require("../../controllers/adminUser.controller");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");
const { authorize } = require("../../middlewares/auth.middleware");

const router = express.Router();

// All routes here additionally require the superadmin role.
router.use(authorize("superadmin"));

router.get("/", listAdmins);
router.patch(
  "/:id",
  mongoIdParam(),
  body("role").optional().isIn(["superadmin", "editor"]),
  body("isActive").optional().isBoolean(),
  body("name").optional().trim().notEmpty(),
  validate,
  updateAdmin
);
router.delete("/:id", mongoIdParam(), validate, deleteAdmin);

module.exports = router;
