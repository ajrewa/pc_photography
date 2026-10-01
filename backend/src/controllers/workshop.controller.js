const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Workshop = require("../models/Workshop");
const WorkshopApplication = require("../models/WorkshopApplication");
const { getPagination, buildMeta } = require("../utils/pagination");

// ---------- Public ----------

// @route  GET /api/v1/workshops
// @access Public
const getUpcomingWorkshops = asyncHandler(async (_req, res) => {
  const workshops = await Workshop.find({
    isPublished: true,
    startDate: { $gte: new Date() },
  }).sort({ startDate: 1 });
  new ApiResponse(200, workshops, "Upcoming workshops fetched").send(res);
});

// @route  POST /api/v1/workshops/:id/apply
// @access Public
const applyToWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findOne({ _id: req.params.id, isPublished: true });
  if (!workshop) throw ApiError.notFound("Workshop not found");
  if (workshop.seatsBooked >= workshop.totalSeats) {
    throw ApiError.conflict("This workshop is fully booked");
  }

  const application = await WorkshopApplication.create({
    workshop: workshop._id,
    ...req.body,
  });

  new ApiResponse(201, application, "Application submitted — we'll be in touch").send(res);
});

// ---------- Admin: workshops ----------

const adminGetWorkshops = asyncHandler(async (_req, res) => {
  const workshops = await Workshop.find().sort({ startDate: -1 });
  new ApiResponse(200, workshops, "Workshops fetched").send(res);
});

const adminGetWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) throw ApiError.notFound("Workshop not found");
  new ApiResponse(200, workshop, "Workshop fetched").send(res);
});

const createWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.create(req.body);
  new ApiResponse(201, workshop, "Workshop created").send(res);
});

const updateWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!workshop) throw ApiError.notFound("Workshop not found");
  new ApiResponse(200, workshop, "Workshop updated").send(res);
});

const deleteWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findByIdAndDelete(req.params.id);
  if (!workshop) throw ApiError.notFound("Workshop not found");
  await WorkshopApplication.deleteMany({ workshop: workshop._id });
  new ApiResponse(200, null, "Workshop deleted").send(res);
});

// ---------- Admin: applications ----------

const adminGetApplications = asyncHandler(async (req, res) => {
  const { status, workshop } = req.query;
  const { page, limit, skip } = getPagination(req.query, { defaultLimit: 20 });

  const filter = {};
  if (status) filter.status = status;
  if (workshop) filter.workshop = workshop;

  const [applications, total] = await Promise.all([
    WorkshopApplication.find(filter)
      .populate("workshop", "title city country startDate")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    WorkshopApplication.countDocuments(filter),
  ]);

  new ApiResponse(200, applications, "Applications fetched", buildMeta({ page, limit, total })).send(res);
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await WorkshopApplication.findById(req.params.id);
  if (!application) throw ApiError.notFound("Application not found");

  const wasAccepted = application.status === "accepted";
  application.status = status;
  await application.save();

  if (status === "accepted" && !wasAccepted) {
    await Workshop.findByIdAndUpdate(application.workshop, { $inc: { seatsBooked: 1 } });
  } else if (wasAccepted && status !== "accepted") {
    await Workshop.findByIdAndUpdate(application.workshop, { $inc: { seatsBooked: -1 } });
  }

  new ApiResponse(200, application, "Application status updated").send(res);
});

module.exports = {
  getUpcomingWorkshops,
  applyToWorkshop,
  adminGetWorkshops,
  adminGetWorkshop,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  adminGetApplications,
  updateApplicationStatus,
};
