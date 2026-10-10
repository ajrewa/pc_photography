"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { GratitudeNote } from "@/lib/types";

type Props = {
  notes?: GratitudeNote[] | null;
};

export default function NotesOfGratitude({ notes }: Props) {
  const [index, setIndex] = useState(0);
  const safeNotes = Array.isArray(notes) ? notes : [];

  const next = useCallback(() => {
    if (!safeNotes.length) return;
    setIndex((i) => (i + 1) % safeNotes.length);
  }, [safeNotes.length]);

  const prev = useCallback(() => {
    if (!safeNotes.length) return;
    setIndex((i) => (i - 1 + safeNotes.length) % safeNotes.length);
  }, [safeNotes.length]);

  useEffect(() => {
    if (safeNotes.length <= 1) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next, safeNotes.length]);

  const active = safeNotes[index];

  if (!active) return null;

  return (
    <section className="mx-auto max-w-6xl py-20">
      <div className="relative rounded-[32px] border border-black/5 bg-paper-dim/50 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
        <SectionHeading
          eyebrow="Here's what our couples have to say"
          title="Notes of gratitude"
          align="center"
        />

        <div className={`mt-12 grid gap-10 ${active.image ? "lg:grid-cols-2 lg:items-center lg:gap-16" : "mx-auto max-w-3xl"}`}>
          <div className="text-center lg:text-left">
            {active.rating && (
              <p className="mb-4 flex justify-center gap-1 lg:justify-start" aria-label={`${active.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < (active.rating ?? 0) ? "text-ember" : "text-stone-light"} aria-hidden="true">★</span>
                ))}
              </p>
            )}
            <p className="font-ital text-xl italic leading-relaxed text-ink sm:text-2xl">
              {active.quote}
            </p>

            <p className="font-display mt-6 text-sm uppercase tracking-widest text-ink">
              &mdash; {active.author}
            </p>

            <p className="mt-1 text-xs uppercase tracking-widest text-stone">
              {active.role}
            </p>
          </div>

          {active.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={active.image}
                alt={active.author}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition-opacity duration-500"
              />
            </div>
          )}
        </div>

        {safeNotes.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous note"
              className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-paper text-ink shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-colors hover:bg-ink hover:text-paper sm:flex"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              aria-label="Next note"
              className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-paper text-ink shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-colors hover:bg-ink hover:text-paper sm:flex"
            >
              <ChevronRight size={18} />
            </button>

            <div className="mt-10 flex justify-center gap-2">
              {safeNotes.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to note ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index
                      ? "w-7 bg-ember"
                      : "w-1.5 bg-stone-light"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}