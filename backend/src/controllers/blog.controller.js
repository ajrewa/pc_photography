const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const BlogPost = require("../models/BlogPost");
const { getPagination, buildMeta } = require("../utils/pagination");

// ---------- Public ----------

const getPublishedPosts = asyncHandler(async (req, res) => {
  const { tag, search } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const filter = { isPublished: true };
  if (tag) filter.tag = tag;
  if (search) filter.$text = { $search: search };

  const [posts, total] = await Promise.all([
    BlogPost.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  new ApiResponse(200, posts, "Posts fetched", buildMeta({ page, limit, total })).send(res);
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true }).populate(
    "author",
    "name avatar"
  );
  if (!post) throw ApiError.notFound("Post not found");
  new ApiResponse(200, post, "Post fetched").send(res);
});

// ---------- Admin ----------

const adminGetPosts = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const { page, limit, skip } = getPagination(req.query, { defaultLimit: 20 });

  const filter = {};
  if (status === "published") filter.isPublished = true;
  if (status === "draft") filter.isPublished = false;
  if (search) filter.$text = { $search: search };

  const [posts, total] = await Promise.all([
    BlogPost.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  new ApiResponse(200, posts, "Posts fetched", buildMeta({ page, limit, total })).send(res);
});

const adminGetPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw ApiError.notFound("Post not found");
  new ApiResponse(200, post, "Post fetched").send(res);
});

const createPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.create({ ...req.body, author: req.admin._id });
  new ApiResponse(201, post, "Post created").send(res);
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) throw ApiError.notFound("Post not found");
  new ApiResponse(200, post, "Post updated").send(res);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) throw ApiError.notFound("Post not found");
  new ApiResponse(200, null, "Post deleted").send(res);
});

module.exports = {
  getPublishedPosts,
  getPostBySlug,
  adminGetPosts,
  adminGetPost,
  createPost,
  updatePost,
  deletePost,
};
