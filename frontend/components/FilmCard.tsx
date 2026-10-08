import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { ContentFilm } from "@/lib/content";

export default function FilmCard({ film }: { film: ContentFilm }) {
  return (
    <article className="group relative w-full overflow-hidden rounded-[20px] border border-[#0b0b0a]/10 bg-white shadow-sm transition-all duration-700 hover:border-[#0b0b0a]/30 hover:shadow-xl hover:shadow-[#0b0b0a]/5">
      <div className="flex items-center justify-between gap-3 border-b border-[#0b0b0a]/10 bg-white/80 px-4 py-3 backdrop-blur-md">
        <span className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0b0b0a]/70">
          {film.location}
        </span>
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[#0b0b0a]/40">
          {film.date}
        </span>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f4ef]">
        <Link href={`/films/${encodeURIComponent(film.slug)}`} aria-label={`View ${film.couple} wedding film`} className="absolute inset-0 z-10">
          <Image
            src={film.thumbnail || film.image}
            alt={`${film.couple} wedding film`}
            fill
            sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 24vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <span className="sr-only">View wedding story</span>
        </Link>
        {film.videoUrl && film.videoType === "file" && (
          <video
            src={film.videoUrl}
            poster={film.thumbnail || film.image}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(event) => void event.currentTarget.play()}
            onMouseLeave={(event) => event.currentTarget.pause()}
            className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#0b0b0a]/80 via-[#0b0b0a]/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
        <Link
          href={`/films/${encodeURIComponent(film.slug)}`}
          aria-label={`Open ${film.couple} wedding film`}
          className="absolute inset-0 z-30 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-[#d8382c] hover:bg-[#d8382c] hover:text-white"
        >
          <Play className="h-6 w-6 translate-x-0.5 fill-current" />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">A Film By PC</p>
              <h3 className="mt-0.5 truncate font-serif text-2xl font-normal leading-tight text-white">
                {film.couple}
              </h3>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-[#0b0b0a]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
