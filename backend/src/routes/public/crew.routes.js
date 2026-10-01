const express = require("express");
const { getActiveCrew } = require("../../controllers/crew.controller");

const router = express.Router();

router.get("/", getActiveCrew);

module.exports = router;
