const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Film = require("../models/Film");
const { getPagination, buildMeta } = require("../utils/pagination");

// ---------- Public ----------

// @route  GET /api/v1/films
// @access Public
const getPublishedFilms = asyncHandler(async (req, res) => {
  const { category, search, featured } = req.query;
  const { page, limit, skip } = getPagination(req.query);

  const filter = { isPublished: true };
  if (category && category !== "All") filter.category = category;
  if (featured === "true") filter.isFeatured = true;
  if (search) filter.$text = { $search: search };

  const [films, total] = await Promise.all([
    Film.find(filter).sort({ order: 1, eventDate: -1 }).skip(skip).limit(limit),
    Film.countDocuments(filter),
  ]);

  new ApiResponse(200, films, "Films fetched", buildMeta({ page, limit, total })).send(res);
});

// @route  GET /api/v1/films/:slug
// @access Public
const getFilmBySlug = asyncHandler(async (req, res) => {
  const film = await Film.findOneAndUpdate(
    { slug: req.params.slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!film) throw ApiError.notFound("Film not found");
  new ApiResponse(200, film, "Film fetched").send(res);
});

// ---------- Admin ----------

// @route  GET /api/v1/admin/films
// @access Private
const adminGetFilms = asyncHandler(async (req, res) => {
  const { category, search, status } = req.query;
  const { page, limit, skip } = getPagination(req.query, { defaultLimit: 20 });

  const filter = {};
  if (category && category !== "All") filter.category = category;
  if (status === "published") filter.isPublished = true;
  if (status === "draft") filter.isPublished = false;
  if (search) filter.$text = { $search: search };

  const [films, total] = await Promise.all([
    Film.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Film.countDocuments(filter),
  ]);

  new ApiResponse(200, films, "Films fetched", buildMeta({ page, limit, total })).send(res);
});

// @route  GET /api/v1/admin/films/:id
// @access Private
const adminGetFilm = asyncHandler(async (req, res) => {
  const film = await Film.findById(req.params.id);
  if (!film) throw ApiError.notFound("Film not found");
  new ApiResponse(200, film, "Film fetched").send(res);
});

// @route  POST /api/v1/admin/films
// @access Private
const createFilm = asyncHandler(async (req, res) => {
  const film = await Film.create({ ...req.body, createdBy: req.admin._id });
  new ApiResponse(201, film, "Film created").send(res);
});

// @route  PUT /api/v1/admin/films/:id
// @access Private
const updateFilm = asyncHandler(async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (!film) throw ApiError.notFound("Film not found");
  new ApiResponse(200, film, "Film updated").send(res);
});

// @route  DELETE /api/v1/admin/films/:id
// @access Private
const deleteFilm = asyncHandler(async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  if (!film) throw ApiError.notFound("Film not found");
  new ApiResponse(200, null, "Film deleted").send(res);
});

// @route  PATCH /api/v1/admin/films/:id/publish
// @access Private
const togglePublish = asyncHandler(async (req, res) => {
  const film = await Film.findById(req.params.id);
  if (!film) throw ApiError.notFound("Film not found");
  film.isPublished = !film.isPublished;
  await film.save();
  new ApiResponse(200, film, `Film ${film.isPublished ? "published" : "unpublished"}`).send(res);
});

module.exports = {
  getPublishedFilms,
  getFilmBySlug,
  adminGetFilms,
  adminGetFilm,
  createFilm,
  updateFilm,
  deleteFilm,
  togglePublish,
};
