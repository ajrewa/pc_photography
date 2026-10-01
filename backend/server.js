const app = require("./src/app");
const env = require("./src/config/env");
const { connectDB } = require("./src/config/db");

let server;

async function start() {
  try {
    await connectDB();
    server = app.listen(env.PORT, () => {
      console.log(`[server] The Wedding Filmer API running on port ${env.PORT} (${env.NODE_ENV})`);
    });
  } catch (err) {
    console.error(`[server] Failed to start: ${err.message}`);
    process.exit(1);
  }
}

function shutdown(signal) {
  console.log(`[server] Received ${signal}, shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log("[server] Closed remaining connections");
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  } else {
    process.exit(0);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled rejection:", reason);
});

start();
