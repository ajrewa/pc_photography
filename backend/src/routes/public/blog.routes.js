const express = require("express");
const { getPublishedPosts, getPostBySlug } = require("../../controllers/blog.controller");

const router = express.Router();

router.get("/", getPublishedPosts);
router.get("/:slug", getPostBySlug);

module.exports = router;
