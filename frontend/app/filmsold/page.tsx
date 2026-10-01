"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Film = {
  date: string;
  location: string;
  groom: string;
  bride: string;
  image: string;
  accent: "pink" | "blue" | "purple";
  featured?: boolean;
  redirect_url?: string;
};

type FilmSection = {
  title: string;
  section_url: string;
  films: Film[];
};

const accentColors = {
  pink: {
    border: "#FF8FA8",
    strip: "#E32668",
  },
  blue: {
    border: "#6BA8FF",
    strip: "#4B8FE8",
  },
  purple: {
    border: "#B99AFF",
    strip: "#8D6BE8",
  },
};

const filmSections: FilmSection[] = [
  {
    title: "Trending Now",
    section_url: "trending",
    films: [
      {
        date: "JUN 2025",
        location: "EUROPE",
        groom: "Federico",
        bride: "Arya",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
      },
      {
        date: "MAR 2025",
        location: "INDIA",
        groom: "Vishal",
        bride: "Nikki",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
        featured: true,
      },
      {
        date: "DEC 2024",
        location: "INDIA",
        groom: "Akshay",
        bride: "Priya",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
      },
      {
        date: "NOV 2024",
        location: "NORTH INDIA",
        groom: "Aayush",
        bride: "Ananya",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
      },
      {
        date: "OCT 2024",
        location: "INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
      },
      {
        date: "NOV 2024",
        location: "NORTH INDIA",
        groom: "Aayush",
        bride: "Ananya",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
      },
      {
        date: "OCT 2024",
        location: "INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
      },
    ],
  },

  {
    title: "PC Classics",
    section_url: "classics",
    films: [
      {
        date: "OCT 2024",
        location: "INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
      },
      {
        date: "AUG 2024",
        location: "INDIA",
        groom: "Arjun",
        bride: "Meera",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
      },
      {
        date: "JUL 2024",
        location: "INDIA",
        groom: "Karan",
        bride: "Riya",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
      },
      {
        date: "MAY 2024",
        location: "INDIA",
        groom: "Kabir",
        bride: "Ishita",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
      },
      {
        date: "APR 2024",
        location: "EUROPE",
        groom: "Daniel",
        bride: "Sofia",
        image: "/pc_logo.png",
        redirect_url: "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
      },
    ],
  },
];

function WeddingLogo({ groom, bride }: { groom: string; bride: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="font-serif text-[29px] leading-none text-black sm:text-[33px] lg:text-[35px]">
          {groom.charAt(0).toUpperCase()}
        </span>

        {/* Outlined heart */}
        <span className="font-sans text-[22px] font-normal leading-none text-black sm:text-[24px]">
          ♡
        </span>

        <span className="font-serif text-[29px] leading-none text-black sm:text-[33px] lg:text-[35px]">
          {bride.charAt(0).toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function FilmCard({ film }: { film: Film }) {
  const colors = accentColors[film.accent];

  return (
    <article className="group w-full">
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[16px]
          border-[2px]
          bg-white
          transition-all
          duration-300
          group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]
          sm:rounded-[18px]
        "
        style={{
          borderColor: colors.border,
        }}
      >
        {/* Couple Logo */}
        <div className="px-3 pt-4 sm:px-4 sm:pt-5 lg:px-3 lg:pt-4">
          <WeddingLogo groom={film.groom} bride={film.bride} />
        </div>

        {/* Image */}
        <div
          className="
            relative
            mx-2
            my-2
            aspect-[0.95/1]
            overflow-hidden
            rounded-[9px]
            sm:mx-3
            sm:mt-4
            sm:aspect-[0.9/1]
            lg:mx-2
            lg:mt-2
            lg:aspect-[0.92/1]
            xl:aspect-[1/1]
          "
        >
          <Image
            src={film.image}
            alt={`${film.groom} and ${film.bride} wedding film`}
            fill
            sizes="
              (max-width: 639px) 75vw,
              (max-width: 767px) 55vw,
              (max-width: 1023px) 30vw,
              (max-width: 1279px) 22vw,
              18vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.04]
            "
          />

          {/* Dark cinematic overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-black/10
              to-black/5
            "
          />

          {/* Play Button */}
          <button
            type="button"
            aria-label={`Play ${film.groom} and ${film.bride} wedding film`}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              color: colors.border,
            }}
            onClick={() => {
              if (!film.redirect_url) return;

              window.open(film.redirect_url, "_blank");
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-12 w-12 fill-none stroke-current sm:h-14 sm:w-14"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 5.5L19 12L8 18.5V5.5Z" />
            </svg>
          </button>

          {/* Couple Details Over Image */}
          <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-4">
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.16em]
                text-white/75
                sm:text-[9px]
              "
            >
              {film.location}
            </p>

            <h3
              className="
                mt-1
                font-serif
                text-[18px]
                leading-tight
                text-white
                sm:text-[20px]
                lg:text-[18px]
              "
            >
              {film.groom} & {film.bride}
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
}

function FilmRow({ section }: { section: FilmSection }) {
  const router = useRouter();
  console.log("@@@@ section",section)

  return (
    <section className="mb-2 sm:mb-4 lg:mb-5">
      {/* Heading */}
      <div className="mb-2 flex items-center justify-between sm:mb-4 lg:mb-5">
        <h2 className="font-serif text-[26px] uppercase tracking-[0.025em] text-[#090909] sm:text-[30px] lg:text-[32px]">
          {section.title}
        </h2>

        <button
          type="button"
          onClick={() => router.push(`/films/${section.section_url}`)}
          className="
            rounded-full
            bg-black
            px-5
            py-2.5
            text-[11px]
            text-white
            transition
            hover:bg-[#222]
            sm:px-6
            sm:py-3
            sm:text-[12px]
            lg:px-7
            lg:text-[13px]
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
          gap-3
          overflow-x-auto
          px-1
          pb-3
          scrollbar-none
          min-[426px]:gap-4
          sm:gap-5
          md:gap-5
          lg:gap-5
          2xl:gap-6
        "
      >
        {section.films.map((film, index) => (
          <div
            key={`${film.groom}-${film.bride}-${index}`}
            className="
              shrink-0
              w-[calc((100%_-_0.75rem)_/_2)]
              min-[426px]:w-[calc((100%_-_2rem)_/_3)]
              md:w-[calc((100%_-_3.75rem)_/_4)]
              lg:w-[calc((100%_-_5rem)_/_5)]
              2xl:w-[calc((100%_-_6rem)_/_6)]
            "
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Films() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-4 pb-8 sm:px-6 sm:pb-10 md:px-8 lg:px-10 xl:px-12">
      <section
        className="
    relative
    -mx-4
    mb-4
    h-[220px]
    overflow-hidden
    sm:-mx-6
    sm:h-[260px]
    md:-mx-8
    lg:-mx-10
    lg:h-[300px]
    xl:-mx-12
  "
      >
        {/* Background Video */}
        <video
          className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
    "
          src="20260820_080237_UTC_0.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Glass Heading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
        rounded-[14px]
        border border-white/30
        bg-white/10
        px-7
        py-4
        shadow-[0_8px_40px_rgba(0,0,0,0.12)]
        backdrop-blur-md
        sm:px-10
        sm:py-5
      "
          >
            <h1
              className="
          font-serif
          text-[30px]
          uppercase
          tracking-[0.08em]
          text-white
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]
          sm:text-[36px]
          lg:text-[42px]
        "
            >
              PC FILMS
            </h1>
          </div>
        </div>
      </section>
      {filmSections.map((section) => (
        <FilmRow key={section.section_url} section={section} />
      ))}
    </main>
  );
}
