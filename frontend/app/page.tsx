"use client";

import Link from "next/link";
import { ArrowRight, Camera, MapPin, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import NotesOfGratitude from "@/components/NotesOfGratitude";
import FilmReelDivider from "@/components/FilmReelDivider";
import FeatureFilms from "@/components/FeatureFilms";
import type { SiteContent } from "@/lib/content";
import ReviewSubmit from "@/components/Review";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchContent } from "@/lib/store/contentSlice";
import HeroCarousel from "@/components/home/HeroCarousel";
import AroundIndia from "@/components/home/AroundIndia";
import RatingModal from "@/components/common/Rating";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data: content, loading } = useAppSelector((state) => state.content);

  useEffect(() => {
    void dispatch(fetchContent());
  }, [dispatch]);

  if (!content) return <main className="min-h-screen bg-paper" />;

  const allFilms = Array.isArray(content?.hero) && content.hero.length
    ? content.hero : [];

  function HeroShimmer() {
    return (
      <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden rounded-[28px] border border-gray-300 bg-gray-700 lg:h-[95vh]"> {/* Background shimmer */}
        <div className="absolute inset-0 animate-pulse bg-gray-100" /> {/* Bottom content shimmer */}
        <div className="absolute inset-x-5 bottom-10 sm:inset-x-10">
          <div className="h-3 w-32 rounded-full bg-white/40" />
          <div className="mt-3 h-12 w-64 rounded-lg bg-white/40 sm:h-16 sm:w-96" />
          <div className="mt-4 h-5 w-72 max-w-full rounded-full bg-white/30" />
          <div className="mt-5 h-4 w-28 rounded-full bg-white/40" />
        </div> {/* Navigation shimmer */}
        <div className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/20 sm:left-6" />
        <div className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/20 sm:right-6" />
        {/* Dots */} <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0">
          <div className="h-1.5 w-7 rounded-full bg-white/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 lg:pb-0">
      <section className="px-3 sm:px-6 pt-5">
        {loading ? (
          <HeroShimmer />
        ) : (
          <HeroCarousel slides={allFilms} />
        )}
      </section>

      {/* <RatingModal/> */}

      {/* Intro / stats */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:px-16">
        <div>
          <p className="eyebrow text-xs font-medium uppercase text-stone">
            <span className="mr-2 inline-block h-px w-6 bg-ember align-middle" />
            Est. 2016 &middot; Films worldwide
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            We film weddings like we&rsquo;re
            <span className="font-ital italic text-ember">
              {" "}
              not supposed to be there.
            </span>
          </h2>
        </div>
        <p className="max-w-md text-base leading-relaxed text-stone lg:justify-self-end">
          No forced poses, no shouted directions. We follow the day as it
          happens &mdash; the nervous pacing before the ceremony, the overheard
          toast, the last dance nobody wanted to end &mdash; and cut it into
          something you&rsquo;ll want to watch every anniversary.
        </p>
      </section>

      {/* Stat strip */}
      <section className="border-y border-black/10 bg-paper-dim/60">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-black/10 px-5 py-10 text-center sm:px-10 lg:px-16">
          {[
            { n: "260+", l: "Weddings filmed" },
            { n: "31", l: "Countries" },
            { n: "9", l: "Years behind the lens" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-3xl text-ink sm:text-4xl">
                {s.n}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-stone">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FeatureFilms films={content.films} />
      <FilmReelDivider />
      <AroundIndia films={content.india} />

      {/* Process */}
      <section className="bg-ink px-5 py-20 text-paper sm:px-10 lg:px-16">
        <SectionHeading
          eyebrow="How it works"
          title="Three days that become forever"
          dark
        />
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "We come to you",
              body: "Anywhere the ceremony happens, we're already scouting light the day before.",
            },
            {
              icon: Camera,
              title: "We disappear into the day",
              body: "Two shooters, natural light, zero interruptions to your actual wedding.",
            },
            {
              icon: Sparkles,
              title: "You get the film in 6 weeks",
              body: "A highlight film first, then the full-length feature and raw cuts follow.",
            },
          ].map((step) => (
            <div key={step.title} className="border-t border-white/15 pt-6">
              <step.icon size={22} className="text-ember" />
              <h3 className="font-display mt-4 text-2xl text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-light">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <NotesOfGratitude notes={content.gratitude} />

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[28px] bg-ember px-8 py-14 text-paper sm:px-16">
          <p className="eyebrow text-xs font-medium uppercase text-paper/80">
            Shoot Availability
          </p>
          <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
            Planning a shoot? Check our available dates.
          </h2>
          <p className="mt-4 max-w-lg text-paper/80">
            Choose a date that works for you and check our current availability for your shoot.
          </p>
          <Link
            href="/availability"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            Check available dates
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <ReviewSubmit />
      
    </div>
  );
}