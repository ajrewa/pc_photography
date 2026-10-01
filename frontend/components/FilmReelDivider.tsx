"use client";

import Image from "next/image";

import { filmSections } from "@/lib/films";

// Flatten all categories into one film array
const allFilms = filmSections.flatMap((section) => section.films);

// Double the sequence for seamless looping
const reelFrames = [...allFilms, ...allFilms];

function Sprockets({ count }: { count: number }) {
  return (
    <div className="flex h-full items-center justify-between px-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-3 shrink-0 rounded-[2px] bg-paper"
        />
      ))}
    </div>
  );
}

function FrameDivider() {
  return (
    <div className="flex h-full w-3.5 shrink-0 flex-col bg-ink">
      <div className="h-4 border-b border-paper/20" />

      <div className="flex-1 border-x border-black/40" />

      <div className="h-4 border-t border-paper/20" />
    </div>
  );
}

export default function FilmReelDivider() {
  return (
    <div
      role="img"
      aria-label="A scrolling film reel strip showing photos from every wedding we've shot"
      className="relative h-40 w-full overflow-hidden bg-ink"
    >
      <div
        className="flex h-full w-max items-stretch will-change-transform"
        style={{
          animation: "reelScroll 55s linear infinite",
        }}
      >
        {reelFrames.map((film, i) => (
          <div
            key={`${film.slug}-${i}`}
            className="flex h-full shrink-0"
          >
            <FrameDivider />

            <div className="flex h-full w-56 shrink-0 flex-col">
              <div className="h-4 bg-ink">
                <Sprockets count={7} />
              </div>

              <div className="relative flex-1 bg-paper">
                <Image
                  src={film.image}
                  alt={film.couple}
                  fill
                  sizes="224px"
                  className="object-cover"
                />

                <span className="absolute bottom-1 left-2 text-[7px] font-medium uppercase tracking-[0.3em] text-paper/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                  PC Photography
                </span>
              </div>

              <div className="h-4 bg-ink">
                <Sprockets count={7} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
