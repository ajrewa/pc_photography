/**
 * Seeds a superadmin account and a small set of sample content so the
 * admin panel and public API have something to show immediately.
 *
 * Usage:
 *   npm run seed            seed data (idempotent for the admin account)
 *   npm run seed:destroy    wipe all collections used by this app
 */
const { connectDB, disconnectDB } = require("../config/db");
const env = require("../config/env");

const Admin = require("../models/Admin");
const Film = require("../models/Film");
const Crew = require("../models/Crew");
const Workshop = require("../models/Workshop");
const BlogPost = require("../models/BlogPost");
const Testimonial = require("../models/Testimonial");
const FAQ = require("../models/FAQ");
const SiteSettings = require("../models/SiteSettings");

const sampleFilms = [
  {
    couple: "Arya & Federico",
    location: "Lake Como, Italy",
    eventDate: new Date("2025-06-14"),
    teaser:
      "When a supermodel married her Italian stallion on a horse ranch outside Milan, it was so dreamy that they had to have two ceremonies.",
    category: "Destination",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552",
    isFeatured: true,
  },
  {
    couple: "Akshay & Riya",
    location: "Udaipur, India",
    eventDate: new Date("2025-02-08"),
    teaser: "Someone somewhere is made for you, but you have to survive the haldi first.",
    category: "Indian",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
    isFeatured: true,
  },
];

const sampleCrew = [
  {
    name: "Rohan Mehta",
    role: "Founder & Director",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    order: 1,
  },
  {
    name: "Naina Kapoor",
    role: "Lead Cinematographer",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    order: 2,
  },
];

const sampleFaqs = [
  {
    question: "How far in advance should we book?",
    answer: "Most couples book 9–12 months ahead, especially for peak season and destination weddings.",
    order: 1,
  },
  {
    question: "Do you travel outside India?",
    answer: "Yes — about half of our weddings each year are outside India.",
    order: 2,
  },
];

async function seed() {
  await connectDB();

  const existingAdmin = await Admin.findOne({ email: env.SEED_ADMIN_EMAIL });
  if (!existingAdmin) {
    await Admin.create({
      name: "Studio Admin",
      email: env.SEED_ADMIN_EMAIL,
      password: env.SEED_ADMIN_PASSWORD,
      role: "superadmin",
    });
    console.log(`[seed] Created superadmin: ${env.SEED_ADMIN_EMAIL} / ${env.SEED_ADMIN_PASSWORD}`);
  } else {
    console.log("[seed] Superadmin already exists, skipping");
  }

  if ((await Film.countDocuments()) === 0) {
    await Film.insertMany(sampleFilms);
    console.log(`[seed] Inserted ${sampleFilms.length} sample films`);
  }

  if ((await Crew.countDocuments()) === 0) {
    await Crew.insertMany(sampleCrew);
    console.log(`[seed] Inserted ${sampleCrew.length} sample crew members`);
  }

  if ((await FAQ.countDocuments()) === 0) {
    await FAQ.insertMany(sampleFaqs);
    console.log(`[seed] Inserted ${sampleFaqs.length} sample FAQs`);
  }

  if ((await Workshop.countDocuments()) === 0) {
    await Workshop.create({
      title: "Cinematic Wedding Filmmaking Intensive",
      city: "Udaipur",
      country: "India",
      startDate: new Date("2026-10-12"),
      endDate: new Date("2026-10-13"),
      price: 45000,
      currency: "INR",
      totalSeats: 12,
      description: "Two days on how we light, direct, and cut a real wedding.",
    });
    console.log("[seed] Inserted sample workshop");
  }

  if ((await BlogPost.countDocuments()) === 0) {
    await BlogPost.create({
      title: "Five things to ask before you book a wedding filmmaker",
      tag: "Advice",
      excerpt: "The questions that actually tell you how a studio works.",
      content: "Full article content goes here...",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552",
    });
    console.log("[seed] Inserted sample blog post");
  }

  if ((await Testimonial.countDocuments()) === 0) {
    await Testimonial.create({
      quote:
        "They filmed our wedding like it was the only one that mattered that day. We forgot the cameras were even there.",
      authorName: "Priya",
      authorDetail: "married in Udaipur",
      order: 1,
    });
    console.log("[seed] Inserted sample testimonial");
  }

  await SiteSettings.findOneAndUpdate({ singleton: "main" }, {}, { upsert: true });
  console.log("[seed] Ensured site settings document exists");

  console.log("[seed] Done.");
  await disconnectDB();
  process.exit(0);
}

async function destroy() {
  await connectDB();
  await Promise.all([
    Admin.deleteMany(),
    Film.deleteMany(),
    Crew.deleteMany(),
    Workshop.deleteMany(),
    BlogPost.deleteMany(),
    Testimonial.deleteMany(),
    FAQ.deleteMany(),
    SiteSettings.deleteMany(),
  ]);
  console.log("[seed] All collections cleared.");
  await disconnectDB();
  process.exit(0);
}

if (process.argv.includes("--destroy")) {
  destroy().catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
