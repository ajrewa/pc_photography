"use client";

import React, { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Menu,
  Microscope,
  Sprout,
  Star,
  X,
} from "lucide-react";

const faqItems = [
  {
    question: "How does your lawn care service work?",
    answer:
      "We start with an in-depth soil and grass analysis to determine your lawn's specific needs. Based on the results, we create a customized seasonal treatment schedule.",
  },
  {
    question: "When will I see results?",
    answer:
      "Most customers notice improvements in grass color and weed reduction within 7 to 14 days after the first application. Turf density can continue improving throughout the season.",
  },
  {
    question: "Is lawn care safe for pets and children?",
    answer:
      "We prioritize family-conscious lawn care products. Always follow the product label and keep children and pets off treated areas until the application has completely dried.",
  },
  {
    question: "Do I need a long-term contract?",
    answer:
      "No long-term commitment is required. You can adjust, pause, or cancel your service plan according to the applicable service terms.",
  },
  {
    question: "How do I get started?",
    answer:
      "Enter your ZIP code, select your estimated lawn size and choose a service plan to start your quote.",
  },
];

const services = [
  {
    id: "analysis",
    title: "Lawn Analysis",
    description: "Soil testing and lawn health diagnostics.",
    badge: "Scientific Diagnostics",
    image:
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "plans",
    title: "Custom Treatment Plans",
    description: "Treatment plans tailored to your turf and region.",
    badge: "Customized",
    image:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "nutrition",
    title: "Lawn Nutrition",
    description: "Targeted nutrition for healthy, resilient turf.",
    badge: "Bio-Balanced",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "soil",
    title: "Soil & Root Care",
    description: "Support for soil structure and deeper root growth.",
    badge: "Root Care",
    image:
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "pest",
    title: "Weed & Pest Control",
    description: "Targeted strategies for common lawn problems.",
    badge: "Targeted Care",
    image:
      "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=700&q=80",
  },
];

const testimonials = [
  {
    quote:
      "Our yard went from patchy and weedy to a lawn we are proud of. The customized approach made a noticeable difference.",
    author: "David R.",
    location: "Homeowner",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The team took the time to understand our lawn instead of using a one-size-fits-all approach.",
    author: "Marcus C.",
    location: "Verified Customer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The scheduling is simple and the service gives us peace of mind while our family enjoys the yard.",
    author: "Elena R.",
    location: "Homeowner",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
];

export default function Baba() {
  // IMPORTANT:
  // All hooks are declared at the top level.
  // No hooks are inside conditions, loops, callbacks, or JSX.

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(2);

  const [zipCode, setZipCode] = useState("");
  const [lawnSize, setLawnSize] = useState("medium");
  const [serviceType, setServiceType] = useState("full-care");

  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!zipCode.trim()) {
      alert("Please enter your ZIP code.");
      return;
    }

    alert(
      `Quote request started for ZIP ${zipCode}. Lawn size: ${lawnSize}. Plan: ${serviceType}.`
    );
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F9F8F3] font-sans text-[#1A2016] selection:bg-[#2A3C1B] selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#F9F8F3]/90 px-4 pb-2 pt-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#E5E3D7] bg-white/80 px-5 py-3 shadow-sm backdrop-blur-lg sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A3C1B] text-white">
              <Leaf className="h-4 w-4 fill-current text-[#A3C873]" />
            </div>

            <span className="font-serif text-xl font-bold tracking-tight">
              All India Techno Tools
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 rounded-full bg-[#EFF0E6] px-4 py-1.5 text-xs font-semibold text-[#2B3325] md:flex">
            <a
              href="#about"
              className="rounded-full px-4 py-1.5 transition hover:bg-white"
            >
              About
            </a>
            <a
              href="#services"
              className="rounded-full px-4 py-1.5 transition hover:bg-white"
            >
              Services
            </a>
            <a
              href="#science"
              className="rounded-full px-4 py-1.5 transition hover:bg-white"
            >
              Science
            </a>
            <a
              href="#faq"
              className="rounded-full px-4 py-1.5 transition hover:bg-white"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden sm:block">
            <a
              href="#quote"
              className="rounded-full bg-[#2A3C1B] px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-md transition hover:bg-[#1F2E14]"
            >
              Book Service
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="rounded-lg p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-4 rounded-2xl border border-[#E5E3D7] bg-white p-6 shadow-xl md:hidden">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium"
            >
              Services
            </a>
            <a
              href="#science"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium"
            >
              Science
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium"
            >
              FAQ
            </a>

            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full bg-[#2A3C1B] py-3 text-center text-sm font-semibold text-white"
            >
              Book Service
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE0CC] bg-[#EFF0E6] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2A3C1B]">
                <Sprout className="h-3.5 w-3.5 text-[#4D6E28]" />
                Scientifically Formulated Lawn Care
              </div>

              <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Precision lawn care for lasting results
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#4A5443] sm:text-lg">
                Customized plans for lawn health, weed control and targeted
                soil nutrition designed around your grass and climate.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#quote"
                  className="group flex items-center gap-2 rounded-full bg-[#2A3C1B] px-7 py-3.5 text-sm font-medium text-white shadow-lg transition hover:bg-[#1F2E14]"
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>

              <div className="flex flex-wrap gap-6 pt-3 text-xs font-semibold text-[#4A5443]">
                <span>✓ Customized Plans</span>
                <span>✓ Seasonal Care</span>
                <span>✓ Family-Conscious</span>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8EB15B]/20 blur-3xl sm:h-96 sm:w-96" />

              <div className="relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-3xl border-4 border-white/80 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=1200&q=80"
                  alt="Healthy green lawn"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                  <div>
                    <p className="text-xs font-semibold text-[#608631]">
                      Lawn Health First
                    </p>
                    <p className="text-sm font-bold">
                      Customized soil & turf care
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A3C1B] text-xs font-bold text-white">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QUOTE */}
          <div
            id="quote"
            className="mx-auto mt-12 max-w-5xl rounded-3xl border border-[#DFE1D2] bg-[#EFF0E6]/90 p-6 shadow-xl backdrop-blur-md sm:p-8"
          >
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A3C1B] text-xs font-bold text-white">
                ✓
              </div>

              <h2 className="font-serif text-lg font-bold sm:text-xl">
                Instant Lawn Care Quote
              </h2>
            </div>

            <form
              onSubmit={handleQuoteSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              <div>
                <label
                  htmlFor="zip"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#4A5443]"
                >
                  ZIP Code
                </label>

                <input
                  id="zip"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="e.g. 90210"
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                  className="w-full rounded-xl border border-[#CBD0B9] bg-white px-4 py-2.5 text-sm font-medium outline-none transition focus:ring-2 focus:ring-[#2A3C1B]/50"
                />
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#4A5443]"
                >
                  Lawn Size
                </label>

                <select
                  id="size"
                  value={lawnSize}
                  onChange={(event) => setLawnSize(event.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-[#CBD0B9] bg-white px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#2A3C1B]/50"
                >
                  <option value="small">Small (&lt; 3,000 sq ft)</option>
                  <option value="medium">Medium (3,000 - 8,000 sq ft)</option>
                  <option value="large">Large (8,000 - 15,000 sq ft)</option>
                  <option value="estate">Estate (15,000+ sq ft)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="plan"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#4A5443]"
                >
                  Plan Type
                </label>

                <select
                  id="plan"
                  value={serviceType}
                  onChange={(event) => setServiceType(event.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-[#CBD0B9] bg-white px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#2A3C1B]/50"
                >
                  <option value="full-care">
                    Full Year Lawn Protection
                  </option>
                  <option value="weed-feed">Weed Shield & Feed</option>
                  <option value="soil-rehab">Soil Rehabilitation</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A2016] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#2A3C1B]"
                >
                  Get Your Quote
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-8"
        >
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#608631]">
              The Turf Doctor Difference
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold leading-snug sm:text-4xl">
              Simple, transparent and built around your lawn.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#4A5443] sm:text-base">
              We focus on understanding your lawn's needs rather than relying
              on a one-size-fits-all routine.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <img
              src="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=500&q=80"
              alt="Green grass"
              className="h-48 w-full rounded-3xl object-cover shadow-md sm:h-64"
            />

            <img
              src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=500&q=80"
              alt="Lawn inspection"
              className="mt-8 h-48 w-full rounded-3xl object-cover shadow-md sm:h-64"
            />

            <img
              src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=500&q=80"
              alt="Lawn care"
              className="h-48 w-full rounded-3xl object-cover shadow-md sm:h-64"
            />

            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=500&q=80"
              alt="Healthy turf"
              className="mt-8 h-48 w-full rounded-3xl object-cover shadow-md sm:h-64"
            />
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-8"
        >
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#608631]">
                Tailored Plans
              </span>

              <h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
                Care your lawn can rely on
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#4A5443]">
              Practical lawn care built around seasonal needs, soil conditions
              and the goals you have for your outdoor space.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <article
                key={service.id}
                className="group flex overflow-hidden rounded-2xl border border-[#3B5223] bg-[#2A3C1B] text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex w-full flex-col justify-between">
                  <div className="space-y-3 p-5">
                    <span className="inline-block rounded-full bg-[#3B5223] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A3C873]">
                      {service.badge}
                    </span>

                    <h3 className="font-serif text-lg font-bold leading-tight transition group-hover:text-[#A3C873]">
                      {service.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#C2CDB5]">
                      {service.description}
                    </p>
                  </div>

                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A3C1B] via-transparent to-transparent" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <div className="mb-2 flex justify-center gap-1 text-[#E5B800]">
              {[0, 1, 2, 3, 4].map((number) => (
                <Star
                  key={number}
                  className="h-4 w-4 fill-current"
                />
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#608631]">
              Homeowner Experiences
            </p>

            <h2 className="mt-1 font-serif text-3xl font-bold">
              Loved by homeowners
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className="rounded-3xl border border-[#DFE1D2] bg-[#EFF0E6]/80 p-6 shadow-sm transition hover:shadow-lg sm:p-8"
              >
                <div className="mb-4 flex gap-1 text-[#E5B800]">
                  {[0, 1, 2, 3, 4].map((number) => (
                    <Star
                      key={number}
                      className="h-4 w-4 fill-current"
                    />
                  ))}
                </div>

                <p className="mb-6 font-serif text-sm italic leading-relaxed text-[#2B3325] sm:text-base">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="h-10 w-10 rounded-full border-2 border-[#2A3C1B] object-cover"
                  />

                  <div>
                    <h3 className="text-xs font-bold">
                      {item.author}
                    </h3>
                    <p className="text-[11px] font-medium text-[#608631]">
                      {item.location}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SCIENCE */}
        <section
          id="science"
          className="mx-auto my-10 max-w-7xl rounded-3xl border border-[#E1E3D4] bg-[#EFF0E6]/60 px-4 py-20 sm:px-8"
        >
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#608631]">
              Data-Driven Agronomy
            </span>

            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              A scientific approach to lawn care
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative mx-auto h-56 max-w-md overflow-hidden rounded-3xl border-4 border-[#2A3C1B] bg-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?auto=format&fit=crop&w=700&q=80"
                alt="Turf analysis"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                <Microscope className="mb-2 h-9 w-9 text-[#A3C873]" />

                <span className="rounded-full bg-[#2A3C1B] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Turf Doctor Method
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["1. Soil Testing", "Understand nutrient conditions"],
                ["2. Custom Formulas", "Target specific lawn needs"],
                ["3. Weed Strategy", "Address weeds appropriately"],
                ["4. Seasonal Care", "Adapt throughout the year"],
                ["5. Root Support", "Focus on healthy turf"],
                ["6. Ongoing Monitoring", "Adjust care as needed"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#DFE1D2] bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-xs font-bold text-[#1A2016]">
                    {title}
                  </p>
                  <p className="mt-1 text-[11px] text-[#608631]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto max-w-4xl px-4 py-20 sm:px-8"
        >
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#608631]">
              Got Questions?
            </span>

            <h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
              Answers to common questions
            </h2>

            <p className="mt-2 text-sm text-[#4A5443]">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;

              return (
                <div
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isOpen
                      ? "border-[#2A3C1B] bg-[#2A3C1B] text-white shadow-lg"
                      : "border-[#E1E3D4] bg-white text-[#1A2016]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm font-semibold sm:text-base">
                      {item.question}
                    </span>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "rotate-180 bg-white/20 text-white"
                          : "bg-[#EFF0E6] text-[#2A3C1B]"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5 pt-3 text-xs leading-relaxed text-[#C2CDB5] sm:text-sm">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 bg-[#1F2E14] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="-translate-y-12 rounded-3xl border border-[#3B5223] bg-[#2A3C1B] p-8 shadow-2xl sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                  Schedule your lawn service
                </h2>

                <p className="mt-2 text-xs text-[#A3C873] sm:text-sm">
                  Start with a simple lawn care quote.
                </p>
              </div>

              <a
                href="#quote"
                className="whitespace-nowrap rounded-full bg-[#A3C873] px-8 py-3.5 text-sm font-bold text-[#1A2016] shadow-md transition hover:bg-[#8EB15B]"
              >
                Get Started Now
              </a>
            </div>
          </div>

          <div className="-mt-4 grid grid-cols-1 gap-10 pb-16 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A3C873] text-[#1A2016]">
                  <Leaf className="h-4 w-4 fill-current" />
                </div>

                <span className="font-serif text-xl font-bold">
                  Turf Doctor
                </span>
              </div>

              <p className="text-xs leading-relaxed text-[#8EB15B]">
                Lawn care focused on healthy turf, thoughtful treatment and
                long-term lawn improvement.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold">Services</h3>

              <ul className="space-y-2 text-xs text-[#C2CDB5]">
                <li>Lawn Diagnostic Analysis</li>
                <li>Custom Lawn Nutrition</li>
                <li>Soil & Root Care</li>
                <li>Weed Management</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold">Company</h3>

              <ul className="space-y-2 text-xs text-[#C2CDB5]">
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>

                <li>
                  <a href="#science" className="hover:text-white">
                    Our Method
                  </a>
                </li>

                <li>
                  <a href="#faq" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold">Get Started</h3>

              <p className="mb-4 text-xs leading-relaxed text-[#C2CDB5]">
                Ready to learn what your lawn needs?
              </p>

              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-full bg-[#A3C873] px-5 py-2.5 text-xs font-bold text-[#1A2016] transition hover:bg-[#8EB15B]"
              >
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#3B5223] py-6 text-center text-xs text-[#8EB15B]">
            © {new Date().getFullYear()} Turf Doctor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
