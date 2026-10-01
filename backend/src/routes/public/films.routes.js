const express = require("express");
const { getPublishedFilms, getFilmBySlug } = require("../../controllers/film.controller");

const router = express.Router();

router.get("/", getPublishedFilms);
router.get("/:slug", getFilmBySlug);

module.exports = router;
