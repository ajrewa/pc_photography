const express = require("express");
const {
  adminGetPosts,
  adminGetPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/blog.controller");
const { createBlogValidator, updateBlogValidator } = require("../../validators/blog.validator");
const { mongoIdParam } = require("../../validators/film.validator");
const validate = require("../../middlewares/validate.middleware");

const router = express.Router();

router.get("/", adminGetPosts);
router.get("/:id", mongoIdParam(), validate, adminGetPost);
router.post("/", createBlogValidator, validate, createPost);
router.put("/:id", mongoIdParam(), updateBlogValidator, validate, updatePost);
router.delete("/:id", mongoIdParam(), validate, deletePost);

module.exports = router;
