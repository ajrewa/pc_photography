const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Film = require("../models/Film");
const BlogPost = require("../models/BlogPost");
const Crew = require("../models/Crew");
const Workshop = require("../models/Workshop");
const WorkshopApplication = require("../models/WorkshopApplication");
const Enquiry = require("../models/Enquiry");

// @route  GET /api/v1/admin/dashboard
// @access Private
const getDashboardSummary = asyncHandler(async (_req, res) => {
  const [
    totalFilms,
    publishedFilms,
    totalPosts,
    publishedPosts,
    activeCrew,
    upcomingWorkshops,
    pendingApplications,
    newEnquiries,
    totalEnquiries,
    recentEnquiries,
  ] = await Promise.all([
    Film.countDocuments(),
    Film.countDocuments({ isPublished: true }),
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ isPublished: true }),
    Crew.countDocuments({ isActive: true }),
    Workshop.countDocuments({ isPublished: true, startDate: { $gte: new Date() } }),
    WorkshopApplication.countDocuments({ status: "pending" }),
    Enquiry.countDocuments({ status: "new" }),
    Enquiry.countDocuments(),
    Enquiry.find().sort({ createdAt: -1 }).limit(5).select("names email status createdAt"),
  ]);

  new ApiResponse(
    200,
    {
      films: { total: totalFilms, published: publishedFilms, drafts: totalFilms - publishedFilms },
      blog: { total: totalPosts, published: publishedPosts, drafts: totalPosts - publishedPosts },
      crew: { active: activeCrew },
      workshops: { upcoming: upcomingWorkshops, pendingApplications },
      enquiries: { new: newEnquiries, total: totalEnquiries, recent: recentEnquiries },
    },
    "Dashboard summary fetched"
  ).send(res);
});

module.exports = { getDashboardSummary };
