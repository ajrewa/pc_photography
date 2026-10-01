// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Play, Sparkles } from "lucide-react";

// type Film = {
//   date: string;
//   location: string;
//   groom: string;
//   bride: string;
//   image: string;
//   accent?: "gold" | "silver" | "bronze";
//   featured?: boolean;
//   redirect_url?: string;
// };

// type FilmSection = {
//   title: string;
//   subtitle?: string;
//   section_url: string;
//   films: Film[];
// };

// const filmSections: FilmSection[] = [
//   {
//     title: "Trending Stories",
//     subtitle: "Our most requested cinematic films this season",
//     section_url: "trending",
//     films: [
//       {
//         date: "JUN 2025",
//         location: "EUROPE",
//         groom: "Federico",
//         bride: "Arya",
//         image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "gold",
//       },
//       {
//         date: "MAR 2025",
//         location: "UDAIPUR, INDIA",
//         groom: "Vishal",
//         bride: "Nikki",
//         image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "gold",
//         featured: true,
//       },
//       {
//         date: "DEC 2024",
//         location: "JAIPUR, INDIA",
//         groom: "Akshay",
//         bride: "Priya",
//         image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "silver",
//       },
//       {
//         date: "NOV 2024",
//         location: "GOA, INDIA",
//         groom: "Aayush",
//         bride: "Ananya",
//         image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "gold",
//       },
//       {
//         date: "OCT 2024",
//         location: "DELHI, INDIA",
//         groom: "Rahul",
//         bride: "Simran",
//         image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "silver",
//       },
//     ],
//   },
//   {
//     title: "PC Signature Classics",
//     subtitle: "Timeless masterpieces crafted for eternal memories",
//     section_url: "classics",
//     films: [
//       {
//         date: "OCT 2024",
//         location: "MUMBAI, INDIA",
//         groom: "Rahul",
//         bride: "Simran",
//         image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "gold",
//       },
//       {
//         date: "AUG 2024",
//         location: "KERALA, INDIA",
//         groom: "Arjun",
//         bride: "Meera",
//         image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "gold",
//       },
//       {
//         date: "JUL 2024",
//         location: "CHANDIGARH, INDIA",
//         groom: "Karan",
//         bride: "Riya",
//         image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "silver",
//       },
//       {
//         date: "MAY 2024",
//         location: "JODHPUR, INDIA",
//         groom: "Kabir",
//         bride: "Ishita",
//         image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "gold",
//       },
//       {
//         date: "APR 2024",
//         location: "ITALY, EUROPE",
//         groom: "Daniel",
//         bride: "Sofia",
//         image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         accent: "silver",
//       },
//     ],
//   },
// ];

// function WeddingMonogram({ groom, bride }: { groom: string; bride: string }) {
//   return (
//     <div className="flex items-center justify-center gap-2 py-2">
//       <span className="font-serif text-2xl tracking-widest text-amber-200/90 font-light">
//         {groom.charAt(0).toUpperCase()}
//       </span>
//       <span className="h-1 w-1 rounded-full bg-amber-400/60" />
//       <span className="font-serif text-2xl tracking-widest text-amber-200/90 font-light">
//         {bride.charAt(0).toUpperCase()}
//       </span>
//     </div>
//   );
// }

// function FilmCard({ film }: { film: Film }) {
//   const handlePlay = () => {
//     if (film.redirect_url) {
//       window.open(film.redirect_url, "_blank");
//     }
//   };

//   return (
//     <article className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10">
//       {/* Top Monogram Bar */}
//       <div className="border-b border-white/10 bg-neutral-950/60 px-4 py-1.5 text-center">
//         <WeddingMonogram groom={film.groom} bride={film.bride} />
//       </div>

//       {/* Image Container */}
//       <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
//         <Image
//           src={film.image}
//           alt={`${film.groom} and ${film.bride} wedding film`}
//           fill
//           sizes="(max-width: 639px) 80vw, (max-width: 1023px) 40vw, 22vw"
//           className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//         />

//         {/* Dark Editorial Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90" />
//         <div className="absolute inset-0 bg-neutral-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//         {/* Play Button */}
//         <button
//           type="button"
//           onClick={handlePlay}
//           aria-label={`Play ${film.groom} and ${film.bride} wedding film`}
//           className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950/70 border border-amber-400/40 text-amber-300 backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-neutral-950 group-hover:border-amber-300"
//         >
//           <Play className="h-6 w-6 fill-current translate-x-0.5" />
//         </button>

//         {/* Details Overlay (Bottom) */}
//         <div className="absolute inset-x-0 bottom-0 p-5 text-left">
//           <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-amber-400/90">
//             {film.location} • {film.date}
//           </p>

//           <h3 className="mt-1 font-serif text-xl font-light text-white leading-tight">
//             {film.groom} & {film.bride}
//           </h3>
//         </div>
//       </div>
//     </article>
//   );
// }

// function FilmRow({ section }: { section: FilmSection }) {
//   const router = useRouter();

//   return (
//     <section className="mb-14 sm:mb-20">
//       {/* Header */}
//       <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-4">
//         <div>
//           <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-amber-400">
//             <Sparkles className="h-3.5 w-3.5" />
//             <span>Exclusive Collection</span>
//           </div>
//           <h2 className="mt-1 font-serif text-2xl font-light text-white sm:text-3xl lg:text-4xl">
//             {section.title}
//           </h2>
//         </div>

//         <button
//           type="button"
//           onClick={() => router.push(`/films/${section.section_url}`)}
//           className="self-start sm:self-auto rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950"
//         >
//           View Collection
//         </button>
//       </div>

//       {/* Cards Grid / Scrollable Row */}
//       <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
//         {section.films.map((film, index) => (
//           <div
//             key={`${film.groom}-${film.bride}-${index}`}
//             className="w-[280px] shrink-0 sm:w-[320px] lg:w-[340px] snap-start"
//           >
//             <FilmCard film={film} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default function Films() {
//   return (
//     <main className="min-h-screen bg-neutral-950 text-white px-4 py-8 sm:px-8 lg:px-12">
      
//       {/* Premium Studio Banner Section */}
//       <section className="relative mb-16 h-[260px] overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 shadow-2xl sm:h-[320px] lg:h-[380px]">
//         {/* Background Cinematic Video */}
//         <video
//           className="absolute inset-0 h-full w-full object-cover opacity-60"
//           src="/20260820_080237_UTC_0.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//         />

//         {/* Ambient Dark Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60" />
//         <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

//         {/* Glass Banner Title Box */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
//           <div className="rounded-2xl border border-white/15 bg-black/40 px-8 py-6 backdrop-blur-xl shadow-2xl sm:px-12 sm:py-8">
//             <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-400">
//               PC Photography Cinema
//             </p>
//             <h1 className="mt-2 font-serif text-3xl font-extralight tracking-wider text-white sm:text-5xl lg:text-6xl">
//               WEDDING FILMS
//             </h1>
//             <p className="mt-2 text-xs tracking-widest text-neutral-300 uppercase hidden sm:block">
//               Cinematic Elegance • Unscripted Moments
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Film Sections */}
//       <div className="mx-auto max-w-7xl">
//         {filmSections.map((section) => (
//           <FilmRow key={section.section_url} section={section} />
//         ))}
//       </div>
//     </main>
//   );
// }

















// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Play, ArrowUpRight, Film as FilmIcon } from "lucide-react";

// type Film = {
//   date: string;
//   location: string;
//   groom: string;
//   bride: string;
//   image: string;
//   featured?: boolean;
//   redirect_url?: string;
// };

// type FilmSection = {
//   title: string;
//   subtitle?: string;
//   section_url: string;
//   films: Film[];
// };

// const filmSections: FilmSection[] = [
//   {
//     title: "Trending Stories",
//     subtitle: "Cinematic narratives captured around the globe",
//     section_url: "trending",
//     films: [
//       {
//         date: "JUN 2025",
//         location: "EUROPE",
//         groom: "Federico",
//         bride: "Arya",
//         image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "MAR 2025",
//         location: "UDAIPUR, INDIA",
//         groom: "Vishal",
//         bride: "Nikki",
//         image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//         featured: true,
//       },
//       {
//         date: "DEC 2024",
//         location: "JAIPUR, INDIA",
//         groom: "Akshay",
//         bride: "Priya",
//         image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "NOV 2024",
//         location: "GOA, INDIA",
//         groom: "Aayush",
//         bride: "Ananya",
//         image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "OCT 2024",
//         location: "DELHI, INDIA",
//         groom: "Rahul",
//         bride: "Simran",
//         image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//     ],
//   },
//   {
//     title: "PC Classics",
//     subtitle: "Timeless heirlooms crafted for eternity",
//     section_url: "classics",
//     films: [
//       {
//         date: "OCT 2024",
//         location: "MUMBAI, INDIA",
//         groom: "Rahul",
//         bride: "Simran",
//         image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "AUG 2024",
//         location: "KERALA, INDIA",
//         groom: "Arjun",
//         bride: "Meera",
//         image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "JUL 2024",
//         location: "CHANDIGARH, INDIA",
//         groom: "Karan",
//         bride: "Riya",
//         image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "MAY 2024",
//         location: "JODHPUR, INDIA",
//         groom: "Kabir",
//         bride: "Ishita",
//         image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//       {
//         date: "APR 2024",
//         location: "ITALY, EUROPE",
//         groom: "Daniel",
//         bride: "Sofia",
//         image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
//         redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
//       },
//     ],
//   },
// ];

// function PremiumFilmCard({ film }: { film: Film }) {
//   const handlePlay = () => {
//     if (film.redirect_url) {
//       window.open(film.redirect_url, "_blank");
//     }
//   };

//   return (
//     <article className="group relative w-full overflow-hidden rounded-[20px] bg-neutral-900 border border-neutral-800 transition-all duration-700 hover:border-neutral-500 hover:shadow-2xl hover:shadow-black/80">
      
//       {/* Top Header Badge */}
//       <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-950/80 px-4 py-3 backdrop-blur-md">
//         <span className="text-[11px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
//           {film.location}
//         </span>
//         <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
//           {film.date}
//         </span>
//       </div>

//       {/* Main Visual Poster */}
//       <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
//         <Image
//           src={film.image}
//           alt={`${film.groom} and ${film.bride} wedding film`}
//           fill
//           sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 24vw"
//           className="object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
//         />

//         {/* Cinematic Vignette */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

//         {/* Floating Minimalist Play Trigger */}
//         <button
//           type="button"
//           onClick={handlePlay}
//           aria-label={`Play ${film.groom} and ${film.bride} wedding film`}
//           className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-2xl"
//         >
//           <Play className="h-6 w-6 fill-current translate-x-0.5" />
//         </button>

//         {/* Bottom Details Overlay */}
//         <div className="absolute inset-x-0 bottom-0 p-5">
//           <div className="flex items-end justify-between">
//             <div>
//               <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-light">
//                 A Film By PC
//               </p>
//               <h3 className="mt-0.5 font-serif text-2xl font-normal text-white leading-tight">
//                 {film.groom} & {film.bride}
//               </h3>
//             </div>
            
//             <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors group-hover:border-white/40 group-hover:text-white">
//               <ArrowUpRight className="h-4 w-4" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// function FilmRow({ section }: { section: FilmSection }) {
//   const router = useRouter();

//   return (
//     <section className="mb-16 sm:mb-24">
//       {/* Editorial Row Header */}
//       <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-800 pb-5">
//         <div>
//           <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-500">
//             {section.subtitle || "Selected Work"}
//           </span>
//           <h2 className="mt-1 font-serif text-3xl font-light text-white sm:text-4xl lg:text-5xl tracking-wide">
//             {section.title}
//           </h2>
//         </div>

//         <button
//           type="button"
//           onClick={() => router.push(`/films/${section.section_url}`)}
//           className="self-start sm:self-auto group flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-6 py-2.5 text-xs font-medium tracking-widest text-white uppercase transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
//         >
//           <span>Explore All</span>
//           <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//         </button>
//       </div>

//       {/* Smooth Horizontal Carousel */}
//       <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
//         {section.films.map((film, index) => (
//           <div
//             key={`${film.groom}-${film.bride}-${index}`}
//             className="w-[280px] shrink-0 sm:w-[320px] lg:w-[350px] snap-start"
//           >
//             <PremiumFilmCard film={film} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default function Films() {
//   return (
//     <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 lg:px-14">
      
//       {/* Studio Header Banner */}
//       <section className="relative mb-20 min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] w-full overflow-hidden rounded-[32px] border border-neutral-800 bg-neutral-950 flex items-center justify-center p-6">
        
//         {/* Background Film Loop */}
//         <video
//           className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
//           src="/20260820_080237_UTC_0.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//         />

//         {/* Monochrome Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
//         <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black" />

//         {/* Banner Glass Title Card */}
//         <div className="relative z-10 flex flex-col items-center text-center">
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-medium tracking-[0.3em] uppercase text-neutral-300 backdrop-blur-xl mb-4">
//             <FilmIcon className="h-3.5 w-3.5 text-white" />
//             <span>PC Cinema Archives</span>
//           </div>

//           <h1 className="font-serif text-4xl font-extralight tracking-widest text-white sm:text-6xl lg:text-7xl uppercase">
//             Wedding Films
//           </h1>

//           <p className="mt-3 max-w-md text-xs sm:text-sm font-light tracking-wider text-neutral-400 uppercase">
//             High-fashion visual stories & unscripted emotion captured on motion picture.
//           </p>
//         </div>
//       </section>

//       {/* Sections Container */}
//       <div className="mx-auto max-w-7xl">
//         {filmSections.map((section) => (
//           <FilmRow key={section.section_url} section={section} />
//         ))}
//       </div>

//     </main>
//   );
// }














"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, ArrowUpRight, Film as FilmIcon } from "lucide-react";

type Film = {
  date: string;
  location: string;
  groom: string;
  bride: string;
  image: string;
  featured?: boolean;
  redirect_url?: string;
};

type FilmSection = {
  title: string;
  subtitle?: string;
  section_url: string;
  films: Film[];
};

const filmSections: FilmSection[] = [
  {
    title: "Trending Stories",
    subtitle: "Cinematic narratives captured around the globe",
    section_url: "trending",
    films: [
      {
        date: "JUN 2025",
        location: "EUROPE",
        groom: "Federico",
        bride: "Arya",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "MAR 2025",
        location: "UDAIPUR, INDIA",
        groom: "Vishal",
        bride: "Nikki",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        featured: true,
      },
      {
        date: "DEC 2024",
        location: "JAIPUR, INDIA",
        groom: "Akshay",
        bride: "Priya",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "NOV 2024",
        location: "GOA, INDIA",
        groom: "Aayush",
        bride: "Ananya",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "OCT 2024",
        location: "DELHI, INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
    ],
  },
  {
    title: "PC Classics",
    subtitle: "Timeless heirlooms crafted for eternity",
    section_url: "classics",
    films: [
      {
        date: "OCT 2024",
        location: "MUMBAI, INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "AUG 2024",
        location: "KERALA, INDIA",
        groom: "Arjun",
        bride: "Meera",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "JUL 2024",
        location: "CHANDIGARH, INDIA",
        groom: "Karan",
        bride: "Riya",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "MAY 2024",
        location: "JODHPUR, INDIA",
        groom: "Kabir",
        bride: "Ishita",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
      {
        date: "APR 2024",
        location: "ITALY, EUROPE",
        groom: "Daniel",
        bride: "Sofia",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
      },
    ],
  },
];

function PremiumFilmCard({ film }: { film: Film }) {
  const handlePlay = () => {
    if (film.redirect_url) {
      window.open(film.redirect_url, "_blank");
    }
  };

  return (
    <article className="group relative w-full overflow-hidden rounded-[20px] bg-white border border-[#0b0b0a]/10 shadow-sm transition-all duration-700 hover:border-[#0b0b0a]/30 hover:shadow-xl hover:shadow-[#0b0b0a]/5">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-[#0b0b0a]/10 bg-white/80 px-4 py-3 backdrop-blur-md">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-[#0b0b0a]/70 uppercase">
          {film.location}
        </span>
        <span className="text-[10px] font-semibold tracking-widest text-[#0b0b0a]/40 uppercase">
          {film.date}
        </span>
      </div>

      {/* Main Visual Poster */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f4ef]">
        <Image
          src={film.image}
          alt={`${film.groom} and ${film.bride} wedding film`}
          fill
          sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 24vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Soft Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a]/80 via-[#0b0b0a]/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Floating Minimalist Play Trigger */}
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play ${film.groom} and ${film.bride} wedding film`}
          className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-[#d8382c] group-hover:text-white group-hover:border-[#d8382c] shadow-xl"
        >
          <Play className="h-6 w-6 fill-current translate-x-0.5" />
        </button>

        {/* Bottom Details Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-white/70 uppercase font-medium">
                A Film By PC
              </p>
              <h3 className="mt-0.5 font-serif text-2xl font-normal text-white leading-tight">
                {film.groom} & {film.bride}
              </h3>
            </div>
            
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-[#0b0b0a]">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FilmRow({ section }: { section: FilmSection }) {
  const router = useRouter();

  return (
    <section className="mb-16 sm:mb-24">
      {/* Editorial Row Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[#0b0b0a]/10 pb-5">
        <div>
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#0b0b0a]/50">
            {section.subtitle || "Selected Work"}
          </span>
          <h2 className="mt-1 font-serif text-3xl font-normal text-[#0b0b0a] sm:text-4xl lg:text-5xl tracking-wide">
            {section.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/films/${section.section_url}`)}
          className="self-start sm:self-auto group flex items-center gap-2 rounded-full border border-[#0b0b0a]/20 bg-white px-6 py-2.5 text-xs font-semibold tracking-widest text-[#0b0b0a] uppercase transition-all duration-300 hover:border-[#0b0b0a] hover:bg-[#0b0b0a] hover:text-[#f6f4ef] shadow-sm"
        >
          <span>Explore All</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Smooth Horizontal Carousel */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
        {section.films.map((film, index) => (
          <div
            key={`${film.groom}-${film.bride}-${index}`}
            className="w-[280px] shrink-0 sm:w-[320px] lg:w-[350px] snap-start"
          >
            <PremiumFilmCard film={film} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Films() {
  return (
    <main className="min-h-screen text-[#0b0b0a] ">
      
      {/* Studio Header Banner */}
      <section className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] w-full overflow-hidden bg-white shadow-sm flex items-center justify-center p-6">
        
        {/* Background Film Loop */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src="/20260820_080237_UTC_0.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6f4ef] via-transparent to-[#f6f4ef]/60" />

        {/* Banner Glass Title Card */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0b0b0a]/10 bg-white/80 px-4 py-1.5 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#0b0b0a]/80 backdrop-blur-md mb-4 shadow-sm">
            <FilmIcon className="h-3.5 w-3.5 text-[#0b0b0a]" />
            <span>PC Cinema Archives</span>
          </div>

          <h1 className="font-serif text-4xl font-normal tracking-widest text-[#0b0b0a] sm:text-6xl lg:text-7xl uppercase">
            Wedding Films
          </h1>

          <p className="mt-3 max-w-md text-xs sm:text-sm font-normal tracking-wider text-[#0b0b0a]/70 uppercase text-balance">
            High-fashion visual stories & unscripted emotion captured on motion picture.
          </p>
        </div>
      </section>

      {/* Sections Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-14">
        {filmSections.map((section) => (
          <FilmRow key={section.section_url} section={section} />
        ))}
      </div>

    </main>
  );
}