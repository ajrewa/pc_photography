const express = require("express");
const {
  adminGetFilms,
  adminGetFilm,
  createFilm,
  updateFilm,
  deleteFilm,
  togglePublish,
} = require("../../controllers/film.controller");
const { createFilmValidator, updateFilmValidator, mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", adminGetFilms);
router.get("/:id", mongoIdParam(), validate, adminGetFilm);
router.post("/", createFilmValidator, validate, createFilm);
router.put("/:id", mongoIdParam(), updateFilmValidator, validate, updateFilm);
router.delete("/:id", mongoIdParam(), validate, deleteFilm);
router.patch("/:id/publish", mongoIdParam(), validate, togglePublish);

module.exports = router;
