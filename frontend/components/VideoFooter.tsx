"use client";

import { ArrowRight } from "lucide-react";

export default function VideoFooter() {
  return (
    <footer className="relative mx-4 mb-4 min-h-[520px] overflow-hidden rounded-[28px] bg-black text-white sm:mx-6 lg:min-h-[650px]">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/87806-601467089.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      
      <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-5 sm:min-h-[650px] sm:p-8 lg:p-10">
        
        {/* CTA */}
        <div className="mb-8 flex justify-center">
          <a
            href="#contact"
            className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
          >
            Enquire Now

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={15} />
            </span>
          </a>
        </div>

        {/* Information panel */}
        <div
          id="contact"
          className="grid grid-cols-1 gap-7 rounded-[24px] border border-white/10 px-6 py-7 backdrop-blur-md sm:grid-cols-3 sm:items-center sm:px-10"
        >
          {/* Phone */}
          <div className="text-center sm:text-left">
            <p className="mb-2 text-xs font-medium tracking-wide text-white/50">
              Phone
            </p>

            <a
              href="tel:+916263908164"
              className="text-sm text-white/80 transition hover:text-white"
            >
              +91 6263908164
            </a>
          </div>

          {/* Studio */}
          <div className="text-center">
            <p className="mb-2 text-xs font-medium tracking-wide text-white/50">
              The Studio
            </p>

            <p className="mx-auto max-w-md text-sm leading-6 text-white/80">
              Astha Bungalow no.30, JP Rd, Tejaji Nagar Part 2,
              <br className="hidden sm:block" />
              Indore, Madhya Pradesh 452001, India
            </p>
          </div>

          {/* Email */}
          <div className="text-center sm:text-right">
            <p className="mb-2 text-xs font-medium tracking-wide text-white/50">
              Email
            </p>

            <a
              href="mailto:info@photography.co.in"
              className="text-sm text-white/80 transition hover:text-white"
            >
              info@photography.co.in
            </a>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Photography Studio. All rights reserved.</p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://yourportfolio.com" // Replace with your portfolio or profile link
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
            >
              ajax
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}