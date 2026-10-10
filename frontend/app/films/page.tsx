"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Film as FilmIcon, Search, X } from "lucide-react";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import FilmCard from "@/components/FilmCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchContent } from "@/lib/store/contentSlice";

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function routePart(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FilmsContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: content, loading, error } = useAppSelector((state) => state.content);
  const searchQuery = searchParams.get("search")?.trim() ?? "";
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    if (!content) void dispatch(fetchContent());
  }, [content, dispatch]);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const films = content?.films ?? [];
  const searchTerms = normalizeSearchText(searchQuery).split(/\s+/).filter(Boolean);
  const filteredFilms = searchTerms.length
    ? films.filter((film) => {
        const searchableText = normalizeSearchText(
          [film.couple, film.category, film.location].join(" "),
        );
        return searchTerms.every((term) => searchableText.includes(term));
      })
    : films;
  const categories = Array.from(
    new Set(filteredFilms.map((film) => film.category).filter(Boolean)),
  );

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = searchInput.trim();
    router.push(value ? `/films?search=${encodeURIComponent(value)}` : "/films", {
      scroll: false,
    });
  }

  return (
    <main className="min-h-screen text-[#0b0b0a]">
      <section className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden bg-white p-6 shadow-sm sm:min-h-[380px] lg:min-h-[440px]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src="/20260820_080237_UTC_0.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6f4ef] via-transparent to-[#f6f4ef]/60" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0b0b0a]/10 bg-white/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0b0b0a]/80 shadow-sm backdrop-blur-md">
            <FilmIcon className="h-3.5 w-3.5 text-[#0b0b0a]" />
            <span>PC Cinema Archives</span>
          </div>
          <h1 className="font-serif text-4xl font-normal uppercase tracking-widest text-[#0b0b0a] sm:text-6xl lg:text-7xl">
            Wedding Films
          </h1>
          <p className="mt-3 max-w-md text-balance text-xs font-normal uppercase tracking-wider text-[#0b0b0a]/70 sm:text-sm">
            High-fashion visual stories &amp; unscripted emotion captured on motion picture.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-14">
        <form
          onSubmit={handleSearch}
          role="search"
          className="mx-auto mb-12 flex max-w-2xl items-center gap-3 rounded-full border border-[#0b0b0a]/15 bg-white px-5 py-2 shadow-sm focus-within:border-[#0b0b0a]/40"
        >
          <Search className="h-4 w-4 shrink-0 text-[#0b0b0a]/50" aria-hidden="true" />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by couple, bride or groom, wedding type, or location"
            aria-label="Search films by couple, bride or groom, wedding type, or location"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#0b0b0a]/40"
          />
          {searchInput && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setSearchInput("");
                router.push("/films", { scroll: false });
              }}
              className="rounded-full p-1 text-[#0b0b0a]/50 transition hover:bg-[#0b0b0a]/5 hover:text-[#0b0b0a]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className="rounded-full bg-[#0b0b0a] px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-white transition hover:bg-[#333]"
          >
            Search
          </button>
        </form>

        {searchQuery && !loading && !error && (
          <p className="mb-8 text-center text-sm text-[#0b0b0a]/60" aria-live="polite">
            {filteredFilms.length
              ? `${filteredFilms.length} ${filteredFilms.length === 1 ? "film" : "films"} found for “${searchQuery}”`
              : `No films found for “${searchQuery}”. Try another name, wedding type, or location.`}
          </p>
        )}

        {loading && !content ? (
          <p className="py-20 text-center text-sm text-stone">Loading films…</p>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-sm text-stone">We couldn’t load the films. Please try again.</p>
            <button
              type="button"
              onClick={() => void dispatch(fetchContent())}
              className="mt-4 text-sm underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : categories.length === 0 ? (
          <p className="py-20 text-center font-display text-2xl text-stone">
            {searchQuery ? "Try another search to discover a wedding film." : "Films are coming soon."}
          </p>
        ) : (
          categories.map((category) => {
            const categoryFilms = filteredFilms.filter((film) => film.category === category);
            const categoryPath = routePart(category);

            return (
              <section key={category} className="mb-16 sm:mb-24">
                <div className="mb-8 flex flex-col gap-3 border-b border-[#0b0b0a]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0b0b0a]/50">
                      Selected work
                    </span>
                    <h2 className="mt-1 font-serif text-3xl font-normal tracking-wide text-[#0b0b0a] sm:text-4xl lg:text-5xl">
                      {category}
                    </h2>
                  </div>
                  <Link
                    href={`/films/${encodeURIComponent(categoryPath)}`}
                    className="group flex self-start items-center gap-2 rounded-full border border-[#0b0b0a]/20 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0b0b0a] shadow-sm transition-all hover:border-[#0b0b0a] hover:bg-[#0b0b0a] hover:text-[#f6f4ef] sm:self-auto"
                  >
                    <span>Explore all</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryFilms.map((film) => (
                    <FilmCard key={film.slug} film={film} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
    </main>
  );
}

export default function Films() {
  return (
    <Suspense fallback={<p className="py-20 text-center text-sm text-stone">Loading films…</p>}>
      <FilmsContent />
    </Suspense>
  );
}
