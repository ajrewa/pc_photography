// "use client";

// import { useEffect, useState, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import type { ContentFilm } from "@/lib/content";

// export default function HeroCarousel({ slides }: { slides: ContentFilm[] }) {
//   const [index, setIndex] = useState(0);

//   const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
//   const prev = useCallback(
//     () => setIndex((i) => (i - 1 + slides.length) % slides.length),
//     [slides.length]
//   );

//   useEffect(() => {
//     const t = setInterval(next, 6500);
//     return () => clearInterval(t);
//   }, [next]);

//   return (
//     <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden rounded-[28px] lg:h-[95vh]">
//       {slides.map((slide, i) => (
//         <div
//           key={slide.slug}
//           className={`absolute inset-0 transition-opacity duration-[1200ms] ease-smooth ${
//             i === index ? "opacity-100" : "pointer-events-none opacity-0"
//           }`}
//         >
//           {slide.videoUrl && slide.videoType === "file" ? (
//             <video
//               src={slide.videoUrl}
//               poster={slide.image}
//               autoPlay={i === index}
//               muted
//               loop
//               playsInline
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <Image
//               src={slide.image}
//               alt={`${slide.couple} — ${slide.location}`}
//               fill
//               priority={i === 0}
//               sizes="100vw"
//               className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />

//           {/* <div className="absolute inset-x-5 top-6 sm:inset-x-10 sm:top-10"> */}
//           <div className="absolute inset-x-5 bottom-10 sm:inset-x-10">
//             <p className="eyebrow flex items-center gap-2 text-[11px] font-medium uppercase text-paper/80">
//               {slide.location}
//               <span className="text-sand">&#9679;</span>
//               {slide.date}
//             </p>
//             <h1 className="font-display mt-2 text-[42px] leading-[0.95] text-paper sm:text-6xl lg:text-7xl">
//               {slide.couple}
//             </h1>
//             <p className="font-ital mt-3 max-w-md text-lg italic text-paper/85 sm:text-xl">
//               {slide.teaser}
//             </p>
//             <Link
//               href={`/films/${slide.slug}`}
//               className="mt-4 inline-block border-b border-paper/50 pb-0.5 text-sm font-medium text-paper transition-colors hover:border-ember hover:text-ember"
//             >
//               Watch the film
//             </Link>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={prev}
//         aria-label="Previous film"
//         className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper/20 sm:left-6"
//       >
//         <ChevronLeft size={20} />
//       </button>
//       <button
//         onClick={next}
//         aria-label="Next film"
//         className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper/20 sm:right-6"
//       >
//         <ChevronRight size={20} />
//       </button>

//       <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             aria-label={`Go to slide ${i + 1}`}
//             onClick={() => setIndex(i)}
//             className={`h-1.5 rounded-full transition-all duration-500 ${
//               i === index ? "w-7 bg-ember" : "w-1.5 bg-paper/40"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }





















"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentFilm } from "@/lib/content";
import DefaultBanner from "./DefaultBanner";

export default function HeroCarousel({ slides }: { slides: ContentFilm[] }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  // if api fails or slides is empty, render the default banner
  if (!slides || slides.length === 0) {
    return (
      <DefaultBanner />
    );
  }

  return (
    <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden rounded-[28px] lg:h-[95vh]">
      {slides.map((slide, i) => (
        <div
          key={slide.slug}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-smooth ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {slide.videoUrl && slide.videoType === "file" ? (
            <video
              src={slide.videoUrl}
              poster={slide.image}
              autoPlay={i === index}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={slide.image}
              alt={`${slide.couple} — ${slide.location}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />

          {/* <div className="absolute inset-x-5 top-6 sm:inset-x-10 sm:top-10"> */}
          <div className="absolute inset-x-5 bottom-10 sm:inset-x-10">
            <p className="eyebrow flex items-center gap-2 text-[11px] font-medium uppercase text-paper/80">
              {slide.location}
              <span className="text-sand">&#9679;</span>
              {slide.date}
            </p>
            <h1 className="font-display mt-2 text-[42px] leading-[0.95] text-paper sm:text-6xl lg:text-7xl">
              {slide.couple}
            </h1>
            <p className="font-ital mt-3 max-w-md text-lg italic text-paper/85 sm:text-xl">
              {slide.teaser}
            </p>
            <Link
              href={`/films/${encodeURIComponent(slide.slug)}`}
              className="mt-4 inline-block border-b border-paper/50 pb-0.5 text-sm font-medium text-paper transition-colors hover:border-ember hover:text-ember"
            >
              Watch the film
            </Link>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous film"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper/20 sm:left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next film"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur-sm transition-colors hover:bg-paper/20 sm:right-6"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-7 bg-ember" : "w-1.5 bg-paper/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
