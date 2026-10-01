const express = require("express");
const upload = require("../../middlewares/upload.middleware");
const { uploadImage, uploadImages, deleteImage } = require("../../controllers/upload.controller");

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);
router.post("/multiple", upload.array("images", 10), uploadImages);
router.delete("/:filename", deleteImage);

module.exports = router;
