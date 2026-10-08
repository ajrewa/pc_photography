"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import FilmCard from "@/components/FilmCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchContent } from "@/lib/store/contentSlice";

function routePart(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function FilmTypePage() {
  const params = useParams<{ type: string }>();
  const type = Array.isArray(params.type) ? params.type[0] : params.type;
  const dispatch = useAppDispatch();
  const { data: content, loading, error } = useAppSelector((state) => state.content);

  useEffect(() => {
    if (!content) void dispatch(fetchContent());
  }, [content, dispatch]);

  if (loading && !content) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-stone">Loading film…</main>;
  }

  if (error || !content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-sm text-stone">
        <p>We couldn’t load this film. Please try again.</p>
        <button type="button" onClick={() => void dispatch(fetchContent())} className="underline underline-offset-4">
          Try again
        </button>
      </main>
    );
  }

  const films = content.films ?? [];
  const film = films.find((item) => item.slug === type);
  if (film) {
    return (
      <main className="min-h-screen bg-ink px-5 pb-20 pt-8 text-paper sm:px-10 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Link href="/films" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper/60 hover:text-paper">
            <ArrowLeft size={14} />
            Back to films
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-black">
              {film.videoUrl && film.videoType === "file" ? (
                <video controls autoPlay playsInline poster={film.image} className="h-full w-full object-cover">
                  <source src={film.videoUrl} />
                </video>
              ) : film.videoUrl ? (
                <iframe
                  src={film.videoUrl}
                  title={`${film.couple} wedding film`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <Image src={film.image} alt={film.couple} fill className="object-cover" />
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-paper/50">{film.category} / {film.date}</p>
              <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">{film.couple}</h1>
              <p className="mt-5 text-sm leading-relaxed text-paper/70">{film.teaser}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.15em] text-paper/50">{film.location}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const category = films.find((item) => routePart(item.category) === type)?.category;
  const categoryFilms = category ? films.filter((item) => item.category === category) : [];

  if (!category || categoryFilms.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-sm text-stone">
        <p>We couldn’t find that film or category.</p>
        <Link href="/films" className="text-ink underline underline-offset-4">
          Back to films
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper px-5 py-12 text-ink sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Link href="/films" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone hover:text-ink">
          <ArrowLeft size={14} />
          All films
        </Link>
        <p className="mt-12 text-xs uppercase tracking-[0.25em] text-stone">Film collection</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl">{category}</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryFilms.map((item) => (
            <FilmCard key={item.slug} film={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
