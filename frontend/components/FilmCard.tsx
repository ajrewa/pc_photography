// import Image from "next/image";
// import Link from "next/link";
// import { Play } from "lucide-react";
// import type { ContentFilm } from "@/lib/content";

// export default function FilmCard({ film }: { film: ContentFilm }) {
//   return (
//     <Link href={`/films/${film.slug}`} className="group block">
//       <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink">
//         <Image
//           src={film.thumbnail || film.image}
//           alt={`${film.couple} — ${film.location}`}
//           fill
//           sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 90vw"
//           className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
//         />
//         {film.videoUrl && film.videoType === "file" && (
//           <video
//             src={film.videoUrl}
//             poster={film.thumbnail || film.image}
//             muted
//             loop
//             playsInline
//             preload="metadata"
//             onMouseEnter={(event) => void event.currentTarget.play()}
//             onMouseLeave={(event) => event.currentTarget.pause()}
//             className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/10" />
//         <span className="absolute right-4 top-4 rounded-full border border-paper/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-paper/90">
//           {film.category}
//         </span>
//         <div className="absolute inset-x-4 bottom-4">
//           <p className="eyebrow text-[10px] uppercase text-paper/70">
//             {film.location} &middot; {film.date}
//           </p>
//           <h3 className="font-display mt-1 text-2xl text-paper">{film.couple}</h3>
//         </div>
//         <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//           <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember/90 text-paper">
//             <Play size={18} fill="currentColor" />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { ContentFilm } from "@/lib/content";

export default function FilmCard({ film }: { film: ContentFilm }) {
  return (
    <Link href={`/films/watch/${film.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink">
        <Image
          src={film.thumbnail || film.image}
          alt={`${film.couple} — ${film.location}`}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
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
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/10" />
        <span className="absolute right-4 top-4 rounded-full border border-paper/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-paper/90">
          {film.category}
        </span>
        <div className="absolute inset-x-4 bottom-4">
          <p className="eyebrow text-[10px] uppercase text-paper/70">
            {film.location} &middot; {film.date}
          </p>
          <h3 className="font-display mt-1 text-2xl text-paper">{film.couple}</h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember/90 text-paper">
            <Play size={18} fill="currentColor" />
          </span>
        </div>
      </div>
    </Link>
  );
}
