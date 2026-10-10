"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Heart, MapPin, Play, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import type { IndiaFilm } from "@/lib/types";
import SectionHeading from "../SectionHeading";

const WORLD_MAP = "/map/world.json";
const INDIA_STATES_MAP = "/map/india-states.json";

type Props = {
  films?: IndiaFilm[] | null;
};

export default function AroundIndia({ films }: Props) {
  const router = useRouter();
  const safeFilms = Array.isArray(films) ? films : [];
  const [activeFilm, setActiveFilm] = useState<IndiaFilm | null>(null);

  const handleViewFilm = () => {
    if (!activeFilm?.filmUrl) return;

    router.push(`/films/${activeFilm.slug}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12">
      <SectionHeading
        eyebrow="Where we've captured love"
        title="Our weddings across India"
      />

      <div className="mt-10 overflow-hidden rounded-[32px] border border-black/10 bg-[#f5f5f2] shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
        <div className="grid lg:grid-cols-[1fr_350px]">
          {/* MAP */}
          <div className="relative min-h-[600px] overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
            </div>

            {/* Header */}
            <div className="absolute left-6 top-6 z-20 sm:left-8 sm:top-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60 shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                India
              </div>

              <h3 className="mt-3 max-w-[260px] font-display text-2xl leading-tight text-black/80 sm:text-3xl">
                Love stories,
                <br />
                across the country.
              </h3>
            </div>

            {/* =====================================================
                WORLD MAP + INDIA STATES
            ===================================================== */}

            <div className="absolute inset-0 flex items-center justify-center px-4 pt-8">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center: [78.9, 22.5],
                  scale: 1050,
                }}
                className="h-full w-full"
              >

                {/* =================================================
                    WORLD
                ================================================= */}

                <Geographies geography={WORLD_MAP}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#e9e9e5"
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                          },
                          hover: {
                            fill: "#e9e9e5",
                            outline: "none",
                          },
                          pressed: {
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* =================================================
                    INDIA STATES
                ================================================= */}

                <Geographies geography={INDIA_STATES_MAP}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName =
                        geo.properties?.ST_NM ||
                        geo.properties?.NAME_1 ||
                        geo.properties?.name ||
                        "";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#d7d7d2"
                          stroke="#ffffff"
                          strokeWidth={0.9}
                          style={{
                            default: {
                              outline: "none",
                            },
                            hover: {
                              fill: "#c9c9c3",
                              outline: "none",
                            },
                            pressed: {
                              outline: "none",
                            },
                          }}
                          onMouseEnter={() => {
                            console.log("State:", stateName);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* =================================================
                    WEDDING LOCATIONS
                ================================================= */}

                {safeFilms.map((film) => (
                  <Marker
                    key={film.id}
                    coordinates={[
                      Number(film.longitude),
                      Number(film.latitude),
                    ]}
                    onClick={() => setActiveFilm(film)}
                  >

                    {/* Outer marker */}
                    <circle
                      r={9}
                      fill="white"
                      stroke="#ed1c24"
                      strokeWidth={1.5}
                    />

                    {/* Heart */}
                    <foreignObject
                      x={-9}
                      y={-9}
                      width={18}
                      height={18}
                      className="pointer-events-none"
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <Heart
                          size={12}
                          strokeWidth={2.8}
                          className="fill-[#ed1c24] text-[#ed1c24]"
                        />
                      </div>
                    </foreignObject>

                  </Marker>
                ))}
              </ComposableMap>
            </div>

            {/* =====================================================
                POPUP
            ===================================================== */}

            {activeFilm && (
              <div className="absolute bottom-6 left-1/2 z-30 w-[calc(100%-32px)] max-w-[440px] -translate-x-1/2">
                <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black p-2 text-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                  <div className="relative h-[190px] overflow-hidden rounded-[20px]">
                    <Image
                      src={activeFilm.image}
                      alt={activeFilm.couple}
                      fill
                      sizes="440px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Close */}
                    <button
                      onClick={() => setActiveFilm(null)}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-md transition hover:bg-black"
                    >
                      <X size={17} />
                    </button>

                    {/* Play */}
                    <button
                      onClick={handleViewFilm}
                      className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                    >
                      <Play
                        size={16}
                        fill="currentColor"
                        className="ml-0.5"
                      />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="px-4 pb-3 pt-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                      <MapPin size={12} />
                      {activeFilm.city}, {activeFilm.state}
                      <span>•</span>
                      {activeFilm.date}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-4">

                      <h3 className="font-display text-2xl">
                        {activeFilm.couple}
                      </h3>

                      <button
                        onClick={handleViewFilm}
                        className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90"
                      >
                        View Film

                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom hint */}
            {!activeFilm && (
              <div className="absolute bottom-6 left-6 z-20">
                <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/50 shadow-sm backdrop-blur-md">
                  <Heart
                    size={13}
                    className="fill-[#ed1c24] text-[#ed1c24]"
                  />
                  Explore our wedding locations
                </div>
              </div>
            )}
          </div>

          {/* =====================================================
              RIGHT FILM LIST
          ===================================================== */}

          <aside className="bg-black p-5 text-white sm:p-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Wedding Films
                </p>
                <h3 className="mt-1 font-display text-2xl">
                  Across India
                </h3>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/40">
                {safeFilms.length} Films
              </span>
            </div>

            <div className="max-h-[500px] space-y-2 overflow-y-auto pr-1">
              {safeFilms.map((film) => {
                const active = activeFilm?.id === film.id;
                return (
                  <button
                    key={film.id}
                    onClick={() => setActiveFilm(film)}
                    className={`group relative flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-all duration-300 ${active
                      ? "bg-white text-black"
                      : "bg-white/[0.035] hover:bg-white/[0.08]"
                      }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-red-500" />
                    )}
                    <div className="relative h-[68px] w-[88px] shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={film.image}
                        alt={film.couple}
                        fill
                        sizes="88px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {active && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                            <Play
                              size={13}
                              fill="currentColor"
                            />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block truncate font-display text-[17px] ${active ? "text-black" : "text-white"
                          }`}
                      >
                        {film.couple}
                      </span>
                      <span
                        className={`mt-1 block text-xs ${active
                          ? "text-black/50"
                          : "text-white/40"
                          }`}
                      >
                        {film.city}, {film.state}
                      </span>

                      <span
                        className={`mt-0.5 block text-[10px] uppercase tracking-wider ${active
                          ? "text-black/40"
                          : "text-white/25"
                          }`}
                      >
                        {film.date}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={`mr-2 ${active
                        ? "text-black"
                        : "text-white/20"
                        }`}
                    />
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}