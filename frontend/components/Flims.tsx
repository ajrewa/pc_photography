"use client";

import Image from "next/image";
import { Play } from "lucide-react";

type Film = {
  date: string;
  location: string;
  title: string;
  image: string;
  borderColor: string;
  featured?: boolean;
};

const trendingFilms: Film[] = [
  {
    date: "JUN 2025",
    location: "EUROPE",
    title: "ARYA & FEDERICO",
    image: "/",
    borderColor: "#C9A96E",
  },
  {
    date: "MAR 2025",
    location: "INDIA",
    title: "NIKKI & VISHAL",
    image: "/images/nikki-vishal.jpg",
    borderColor: "#D59A8B",
    featured: true,
  },
  {
    date: "DEC 2024",
    location: "INDIA",
    title: "PRIYA & AKSHAY",
    image: "/images/priya-akshay.jpg",
    borderColor: "#B8A06A",
  },
  {
    date: "NOV 2024",
    location: "NORTH INDIA",
    title: "AAYUSH & ...",
    image: "/images/aayush.jpg",
    borderColor: "#8C9B82",
  },
];

const classics: Film[] = [
  {
    date: "2024",
    location: "INDIA",
    title: "WEDDING CLASSIC I",
    image: "/images/classic-1.jpg",
    borderColor: "#B28A65",
  },
  {
    date: "2023",
    location: "INDIA",
    title: "WEDDING CLASSIC II",
    image: "/images/classic-2.jpg",
    borderColor: "#8E789D",
  },
  {
    date: "2023",
    location: "INDIA",
    title: "WEDDING CLASSIC III",
    image: "/images/classic-3.jpg",
    borderColor: "#A87B7B",
  },
  {
    date: "2022",
    location: "INDIA",
    title: "WEDDING CLASSIC IV",
    image: "/images/classic-4.jpg",
    borderColor: "#9A936B",
  },
];

function FilmCard({ film }: { film: Film }) {
  return (
    <article
      className="border-2 group min-w-[82vw] sm:min-w-[420px] lg:min-w-0"
      style={
        {
          "--card-border": film.borderColor,
        } as React.CSSProperties
      }
    >
      {/* Image */}
      <div
        className="
          relative aspect-[1.55/1]
          overflow-hidden rounded-[12px]
          border-[1.5px]
          border-[var(--card-border)]
          bg-neutral-100
        "
      >
        <Image
          src={film.image}
          alt={film.title}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 30vw"
          className="
            object-cover
            transition duration-700
            group-hover:scale-[1.035]
          "
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/15" />

        {/* Featured */}
        {film.featured && (
          <div
            className="
              absolute left-3 top-3
              flex items-center gap-2
              rounded-full
              bg-[#d8bd87]/90
              px-4 py-2
              text-[13px] tracking-wide text-white
              backdrop-blur-sm
            "
          >
            <span className="text-[14px]">★</span>
            featured
          </div>
        )}

        {/* Play button */}
        <button
          aria-label={`Play ${film.title}`}
          className="
            absolute left-1/2 top-1/2
            flex h-[64px] w-[64px]
            -translate-x-1/2 -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-black/55
            text-white
            backdrop-blur-[2px]
            transition-all duration-300
            group-hover:scale-110
            group-hover:bg-black/70
          "
        >
          <Play
            size={22}
            fill="white"
            strokeWidth={0}
            className="ml-1"
          />
        </button>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-center gap-3 px-2">
        <span className="text-[13px] tracking-[0.14em] text-[#111]">
          {film.date}
        </span>

        <span className="text-[11px] text-[#c6b28d]">▶</span>

        <span className="text-[13px] tracking-[0.14em] text-[#111]">
          {film.location}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 px-2 font-serif text-[25px] tracking-[0.01em] text-[#080808]">
        {film.title}
      </h3>
    </article>
  );
}

function FilmRow({
  title,
  films,
}: {
  title: string;
  films: Film[];
}) {
  return (
    <section className="mb-[100px]">
      {/* Heading */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="font-serif text-[30px] uppercase tracking-[0.025em] text-[#090909] sm:text-[32px]">
          {title}
        </h2>

        <button
          className="
            rounded-full
            bg-black
            px-7 py-3
            text-[13px]
            text-white
            transition
            hover:bg-[#222]
          "
        >
          view all
        </button>
      </div>

      {/* Horizontal cards */}
      <div
        className="
          -mx-1
          flex
          gap-9
          overflow-x-auto
          px-1 pb-5
          scrollbar-none
        "
      >
        {films.map((film) => (
          <div
            key={film.title}
            className="
              w-[calc((100vw-6rem)/1)]
              shrink-0
              sm:w-[calc((100vw-8rem)/2)]
              lg:w-[calc((100vw-11rem)/3)]
              xl:w-[calc((100vw-12rem)/3.15)]
            "
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function WeddingFilms() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10 sm:px-10 lg:px-12">
      {/* Logo */}
      <header className="mb-[100px] text-center">
        <h1 className="font-serif text-[38px] uppercase tracking-[0.04em] text-black sm:text-[42px]">
          PC FILMS
        </h1>

        <div className="mx-auto mt-7 h-px w-[62px] bg-[#d8d8d8]" />
      </header>

      <FilmRow title="Trending Now" films={trendingFilms} />

      <FilmRow title="PC Classics" films={classics} />
    </main>
  );
}