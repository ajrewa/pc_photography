import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", env.trustProxy);

app.use(
  helmet({
    // Images/videos are fetched cross-origin by the frontend.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: env.clientOrigins.includes("*") ? true : env.clientOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-admin-passcode"],
    maxAge: 86_400,
  })
);

if (!env.isTest) app.use(morgan(env.isProd ? "combined" : "dev"));

app.use(express.json({ limit: "1mb" }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
