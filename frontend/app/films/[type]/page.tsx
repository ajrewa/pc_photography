"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { useEffect } from "react";
import { VideoType } from "@/lib/enums";
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

function autoplayEmbedUrl(url: string) {
  try {
    const embed = new URL(url);
    embed.searchParams.set("autoplay", "1");
    embed.searchParams.set("mute", "1");
    embed.searchParams.set("controls", "0");
    if (/youtube\.com|youtu\.be/i.test(embed.hostname)) {
      embed.searchParams.set("loop", "1");
      const videoId = embed.pathname.split("/").filter(Boolean).pop();
      if (videoId) embed.searchParams.set("playlist", videoId);
    }
    return embed.toString();
  } catch {
    return url;
  }
}

function youtubeWatchUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, "").toLowerCase();
    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/watch?v=${encodeURIComponent(id)}` : url;
    }
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const embedMatch = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/);
      if (embedMatch) {
        return `https://www.youtube.com/watch?v=${encodeURIComponent(embedMatch[1])}`;
      }
    }
    return url;
  } catch {
    return url;
  }
}

function FilmGallery({ title, images }: { title: string; images: string[] }) {
  if (!images.length) return null;

  return (
    <section className="mt-14 sm:mt-20">
      <div className="mb-5 flex items-end justify-between gap-4 px-5 sm:px-9">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone">A closer look</p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl">{title}</h2>
        </div>
        <span className="shrink-0 text-xs text-stone">{images.length} photos</span>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:gap-5 sm:px-9">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative aspect-[1.45] w-[82vw] max-w-[900px] shrink-0 snap-center overflow-hidden rounded-2xl bg-paper-dim sm:w-[70vw] lg:w-[min(72vw,900px)]"
          >
            <Image
              src={image}
              alt={`${title} ${index + 1}`}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 70vw, 900px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
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
    const trailerUrl = film.trailerUrl;
    const bannerVideoUrl = film.videoUrl;
    const places = film.location.split(",").map((place) => place.trim()).filter(Boolean);
    const journeyParagraphs = (film.coupleStory || "")
      .split(/\r?\n\s*\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return (
      <main className="min-h-screen bg-[#faf9f6] pb-20 text-[#0b0b0a]">
        <section className="relative mx-3 mt-3 h-[58vh] min-h-[340px] max-h-[760px] overflow-hidden rounded-[24px] bg-[#9aa9bc] sm:mx-4 sm:mt-4 sm:h-[68vh] sm:rounded-[28px]">
          {bannerVideoUrl && film.videoType === VideoType.File ? (
            <video
              src={bannerVideoUrl}
              poster={film.image}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : bannerVideoUrl ? (
            <iframe
              src={autoplayEmbedUrl(bannerVideoUrl)}
              title={`${film.couple} wedding film`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            <Image
              src={film.image}
              alt={`${film.couple} wedding`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <Link
            href="/films"
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-2.5 text-xs text-white backdrop-blur-md transition hover:bg-black/30 sm:left-6 sm:top-6"
          >
            <ArrowLeft size={15} />
            Back
          </Link>
          {trailerUrl && (
            <a
              href={youtubeWatchUrl(trailerUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#e51f24] px-5 py-3 text-xs font-medium text-white shadow-lg transition hover:bg-[#c9181d] sm:bottom-6 sm:right-6"
            >
              <Play size={13} fill="currentColor" />
              Watch trailer
            </a>
          )}
        </section>

        <section className="mx-auto max-w-[1500px] px-5 pt-8 sm:px-9 sm:pt-10 lg:px-12">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
            <div>
              <p className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
                <span>{film.date}</span>
                <span className="text-[#c6b08a]">◆</span>
                <span>{film.location}</span>
              </p>
              <h1 className="mt-3 font-serif text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">{film.couple}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...places, film.category].filter((place, index, all) => all.indexOf(place) === index).map((place) => (
                  <span key={place} className="rounded-full border border-black/15 px-4 py-2 text-[10px] tracking-wide text-[#444]">
                    {place}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-stone md:pt-1">{film.teaser}</p>
          </div>

          {film.coupleStory && (
            <section className="mx-auto mt-14 max-w-3xl sm:mt-20">
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-stone">Their story</p>
              <h2 className="mt-2 text-center font-display text-3xl sm:text-4xl">A journey worth remembering</h2>
              <div className="mt-6 space-y-5 text-sm leading-8 text-stone sm:text-base">
                {journeyParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </section>
          )}

          <FilmGallery title="The wedding story" images={film.galleryImages ?? []} />
          {film.btsDescription && (
            <section className="mx-auto mt-14 max-w-3xl text-center sm:mt-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone">Beyond the frame</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Behind the scenes</h2>
              <div className="mt-5 space-y-4 text-left text-sm leading-8 text-stone sm:text-base">
                {film.btsDescription.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}
          <FilmGallery title="Behind the scenes" images={film.btsImages ?? []} />

          {!film.galleryImages?.length && !film.btsImages?.length && !film.btsDescription && (
            <p className="mt-12 text-center text-xs text-stone">More moments from this celebration are coming soon.</p>
          )}

          {!!film.filmReviews?.length && (
            <section className="mt-16 border-t border-black/10 pt-12 sm:mt-20 sm:pt-16">
              <div className="mx-auto mb-8 max-w-2xl text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone">In their own words</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl">Notes from the couple &amp; family</h2>
              </div>
              <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
                {film.filmReviews.map((review, index) => (
                  <article key={`${review.reviewer}-${index}`} className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
                    {review.image && (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#eeeae3]">
                        <Image src={review.image} alt={review.reviewer} fill sizes="56px" className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-ital text-base italic leading-relaxed text-[#45423e] sm:text-lg">“{review.quote}”</p>
                      <p className="mt-4 text-sm font-semibold uppercase tracking-wide">{review.reviewer}</p>
                      {review.relationship && <p className="mt-1 text-xs capitalize text-stone">{review.relationship}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 text-center sm:mt-20">
            <Link href="/films" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-xs uppercase tracking-widest transition hover:bg-ink hover:text-paper">
              Explore more films
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

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
