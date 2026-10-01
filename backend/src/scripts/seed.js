/**
 * Loads the starter content (src/data/seed-content.json) into MongoDB.
 *
 *   npm run seed          only fills sections that are still empty
 *   npm run seed:reset    wipes all four sections first, then reseeds
 *
 * Note: --reset only removes database records. Files already uploaded to
 * Backblaze B2 are left in the bucket.
 */
import fs from "node:fs";
import { connectDB, disconnectDB } from "../config/db.js";
import { SECTIONS } from "../models/index.js";

const reset = process.argv.includes("--reset");
const seed = JSON.parse(
  fs.readFileSync(new URL("../data/seed-content.json", import.meta.url), "utf8")
);

async function run() {
  await connectDB();

  for (const [name, section] of Object.entries(SECTIONS)) {
    const items = seed[name] ?? [];

    if (reset) await section.Model.deleteMany({});

    const existing = await section.Model.countDocuments();
    if (existing > 0) {
      console.log(`- ${name}: skipped (${existing} item(s) already there)`);
      continue;
    }

    // `order` keeps the sequence of the JSON file.
    await section.Model.insertMany(items.map((item, index) => ({ ...item, order: index })));
    console.log(`- ${name}: added ${items.length} item(s)`);
  }

  await disconnectDB();
}

run().catch(async (error) => {
  console.error("Seeding failed:", error.message);
  await disconnectDB().catch(() => {});
  process.exit(1);
});
