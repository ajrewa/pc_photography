import { Router } from "express";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import adminRoutes from "./admin.routes.js";
import contentRoutes from "./content.routes.js";
import { getMedia } from "../controllers/media.controller.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    storage: env.b2.configured ? "configured" : "not configured",
  });
});

router.get("/media/*", getMedia);

router.use(contentRoutes);
router.use("/admin", adminRoutes);

export default router;
