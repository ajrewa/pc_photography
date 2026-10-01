


"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Camera, ArrowRight, Sparkles } from "lucide-react";
import type { ContentFilm } from "@/lib/content";

export default function DefaultBanner({ slides }: { slides?: ContentFilm[] }) {
  const [index, setIndex] = useState(0);

  const slidesAvailable = slides && slides.length > 0;

  const next = useCallback(() => {
    if (slidesAvailable) {
      setIndex((i) => (i + 1) % slides.length);
    }
  }, [slidesAvailable, slides?.length]);

  const prev = useCallback(() => {
    if (slidesAvailable) {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
  }, [slidesAvailable, slides?.length]);

  useEffect(() => {
    if (!slidesAvailable) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, slidesAvailable]);

  // Fallback UI: Displays when slides array is empty, undefined, or null
  if (!slidesAvailable) {
    return (
      <div className="relative min-h-[580px] w-full overflow-hidden rounded-[28px] bg-neutral-950 px-6 py-10 text-white border border-white/10 shadow-2xl lg:min-h-[680px] lg:px-14 lg:py-14 flex items-center justify-center">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

        {/* Outer Fine Line Decorative Frame */}
        <div className="absolute inset-4 sm:inset-6 rounded-[22px] border border-white/10 pointer-events-none" />

        {/* Decorative Diamond Accents */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-amber-400/60 z-20">
          <span className="h-1.5 w-1.5 rotate-45 bg-amber-400/80" />
          <span className="h-2 w-2 rotate-45 bg-amber-400" />
          <span className="h-1.5 w-1.5 rotate-45 bg-amber-400/80" />
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-amber-400/60 z-20">
          <span className="h-1.5 w-1.5 rotate-45 bg-amber-400/80" />
          <span className="h-2 w-2 rotate-45 bg-amber-400" />
          <span className="h-1.5 w-1.5 rotate-45 bg-amber-400/80" />
        </div>

        {/* Corner Botanical Vector Elements */}
        <div className="absolute top-8 left-8 text-white/15 pointer-events-none hidden sm:block">
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,90 Q50,50 90,10" />
            <path d="M30,70 Q25,50 15,45 M30,70 Q50,65 55,55" />
            <path d="M50,50 Q45,30 35,25 M50,50 Q70,45 75,35" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 text-white/15 pointer-events-none hidden sm:block rotate-180">
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,90 Q50,50 90,10" />
            <path d="M30,70 Q25,50 15,45 M30,70 Q50,65 55,55" />
            <path d="M50,50 Q45,30 35,25 M50,50 Q70,45 75,35" />
          </svg>
        </div>

        {/* Banner Content Layout Grid */}
        <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          
          {/* Left Side: Arched Image Frames with Circular Badge */}
          <div className="relative flex justify-center gap-4 sm:gap-6 lg:col-span-6 lg:justify-start">
            
            {/* Arch Frame 1 */}
            <div className="relative h-64 w-40 overflow-hidden rounded-t-full border border-white/20 shadow-2xl sm:h-80 sm:w-52 lg:h-96 lg:w-56">
              <Image
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop"
                alt="PC Photography Studio Gear"
                fill
                sizes="(max-width: 768px) 160px, 224px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Arch Frame 2 */}
            <div className="relative h-64 w-40 overflow-hidden rounded-t-full border border-white/20 shadow-2xl sm:h-80 sm:w-52 lg:h-96 lg:w-56 mt-6 sm:mt-10">
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                alt="PC Photography Camera Lens"
                fill
                sizes="(max-width: 768px) 160px, 224px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Rotating Circular Stamp Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 shadow-2xl sm:h-28 sm:w-28">
                {/* Rotating Badge SVG */}
                <svg className="absolute h-full w-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[9px] font-medium tracking-[2px] uppercase fill-amber-300">
                    <textPath href="#circlePath" startOffset="0%">
                      PC PHOTOGRAPHY • EST. 2026 • STUDIO •
                    </textPath>
                  </text>
                </svg>
                {/* Center Icon */}
                <Camera className="h-6 w-6 text-amber-400" />
              </div>
            </div>

            {/* Vertical Year Text Accent */}
            <div className="hidden sm:flex absolute -left-8 bottom-4 flex-col text-xs font-semibold tracking-widest text-white/40 uppercase space-y-1">
              <span>20</span>
              <span>26</span>
            </div>
          </div>

          {/* Right Side: Copywriting & Actions */}
          <div className="text-center lg:col-span-6 lg:text-left">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[3px] uppercase text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              Visual Storytellers
            </p>

            <h1 className="mt-3 font-serif text-4xl leading-tight font-extralight text-white sm:text-6xl lg:text-7xl">
              PC Photography
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base max-w-lg mx-auto lg:mx-0">
              Capturing timeless moments with high-end editorial aesthetics and cinematic depth. Crafting visual stories that resonate forever.
            </p>

            {/* Details Grid */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs tracking-wider text-white/70 uppercase">
              <span className="rounded-full bg-white/5 px-3 py-1.5 border border-white/10">Wedding & Events</span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 border border-white/10">Cinematography</span>
              <span className="rounded-full bg-white/5 px-3 py-1.5 border border-white/10">Portraits</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <Link
                href="availability"
                className="group flex items-center gap-3 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-neutral-950 shadow-xl transition-all duration-300 hover:bg-amber-300 hover:scale-105"
              >
                Book a Session
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Dynamic Carousel UI: Rendered when slides are present
  return (
    <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden rounded-[28px] lg:h-[95vh]">
      {slides.map((slide, i) => (
        <div
          key={slide.slug}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-smooth ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {slide.videoUrl && slide.videoType === "file" ? (
            <video
              src={slide.videoUrl}
              poster={slide.image}
              autoPlay={i === index}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={slide.image}
              alt={`${slide.couple} — ${slide.location}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />

          <div className="absolute inset-x-5 bottom-10 sm:inset-x-10">
            <p className="eyebrow flex items-center gap-2 text-[11px] font-medium uppercase text-paper/80">
              {slide.location}
              <span className="text-sand">&#9679;</span>
              {slide.date}
            </p>
            <h1 className="font-display mt-2 text-[42px] leading-[0.95] text-paper sm:text-6xl lg:text-7xl">
              {slide.couple}
            </h1>
            <p className="font-ital mt-3 max-w-md text-lg italic text-paper/85 sm:text-xl">
              {slide.teaser}
            </p>
            <Link
              href={`/films/watch/${slide.slug}`}
              className="mt-4 inline-block border-b border-paper/50 pb-0.5 text-sm font-medium text-paper transition-colors hover:border-ember hover:text-ember"
            >
              Watch the film
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        aria-label="Previous film"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper/20 sm:left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next film"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper/20 sm:right-6"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-7 bg-ember" : "w-1.5 bg-paper/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}