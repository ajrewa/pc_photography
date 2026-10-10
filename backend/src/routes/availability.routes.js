import { Router } from "express";
import { bookDates, getAvailability } from "../controllers/availability.controller.js";
import { publicReviewLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.get("/", getAvailability);
router.post("/", publicReviewLimiter, bookDates);

export default router;
