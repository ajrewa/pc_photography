import { Router } from "express";
import {
  createItem,
  deleteAllGratitude,
  deleteItem,
  updateItem,
  verifyPasscode,
} from "../controllers/admin.controller.js";
import { deleteMedia, uploadMedia } from "../controllers/upload.controller.js";
import { requirePasscode } from "../middleware/adminPasscode.js";
import { adminLimiter, wrongPasscodeLimiter } from "../middleware/rateLimiters.js";
import { uploadSingle } from "../middleware/upload.js";

const router = Router();

// Everything below needs the admin passcode (checked before any body is read).
router.use(adminLimiter);
router.use(wrongPasscodeLimiter);
router.use(requirePasscode);

router.post("/verify", verifyPasscode);

// Media (declared before "/:section" so "upload" isn't read as a section name)
router.post("/upload", uploadSingle, uploadMedia);
router.delete("/upload", deleteMedia);
router.delete("/gratitude", deleteAllGratitude);

// Content: :section is one of hero | films | india | gratitude
router.post("/:section", createItem);
router.put("/:section/:id", updateItem);
router.delete("/:section/:id", deleteItem);

export default router;
