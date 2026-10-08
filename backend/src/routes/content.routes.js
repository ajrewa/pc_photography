import { Router } from "express";
import { getContent } from "../controllers/content.controller.js";
import { submitReview } from "../controllers/review.controller.js";
import { uploadReviewImage } from "../controllers/review-upload.controller.js";
import { uploadImageSingle } from "../middleware/upload.js";
import { publicReviewLimiter } from "../middleware/rateLimiters.js";

const router = Router();

// Public: everything the website needs to render.
router.get("/content", getContent);
router.post("/reviews", publicReviewLimiter, submitReview);
router.post("/reviews/upload", publicReviewLimiter, uploadImageSingle, uploadReviewImage);

export default router;
