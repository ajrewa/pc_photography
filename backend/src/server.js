import app from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { env } from "./config/env.js";

async function start() {
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
    if (!env.b2.configured) {
      console.warn("Backblaze B2 is not configured: uploads are disabled until the B2_* variables are set.");
    }
  });

  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down...`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    // Don't hang forever on open connections (e.g. a large upload in flight).
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((error) => {
  console.error("Failed to start the server:", error.message);
  process.exit(1);
});
