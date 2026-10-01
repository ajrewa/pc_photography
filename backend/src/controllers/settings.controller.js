const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const SiteSettings = require("../models/SiteSettings");

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne({ singleton: "main" });
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

// @route  GET /api/v1/settings
// @access Public
const getPublicSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();
  new ApiResponse(200, settings, "Site settings fetched").send(res);
});

// @route  GET /api/v1/admin/settings
// @access Private
const adminGetSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();
  new ApiResponse(200, settings, "Site settings fetched").send(res);
});

// @route  PUT /api/v1/admin/settings
// @access Private
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate({ singleton: "main" }, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  new ApiResponse(200, settings, "Site settings updated").send(res);
});

module.exports = { getPublicSettings, adminGetSettings, updateSettings };
