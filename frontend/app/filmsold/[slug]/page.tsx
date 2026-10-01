"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Film = {
  date: string;
  location: string;
  groom: string;
  bride: string;
  image: string;
  accent: "pink" | "blue" | "purple";
  featured?: boolean;
  redirect_url?: string;
  tags?: string[];
  videoType?: string;
};

type FilmSection = {
  title: string;
  section_url: string;
  description?: string;
  films: Film[];
};

type FilterDropdownProps = {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

const filmSections: FilmSection[] = [
  {
    title: "Trending Now",
    section_url: "trending",
    description:
      "Our latest wedding films, cinematic stories and celebrations from around the world.",
    films: [
      {
        date: "JUN 2025",
        location: "LAKE COMO, ITALY",
        groom: "Federico",
        bride: "Arya",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
        featured: true,
        tags: ["Lake Como", "Italy", "International"],
        videoType: "Wedding Film",
      },
      {
        date: "MAR 2025",
        location: "INDIA",
        groom: "Vishal",
        bride: "Nikki",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
        featured: true,
        tags: ["Vedic Wedding", "Anambagh", "India"],
        videoType: "Wedding Film",
      },
      {
        date: "DEC 2024",
        location: "INDIA",
        groom: "Akshay",
        bride: "Priya",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
        tags: ["India", "Classic"],
        videoType: "Wedding Film",
      },
      {
        date: "NOV 2024",
        location: "NORTH INDIA",
        groom: "Aayush",
        bride: "Ananya",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
        tags: ["North India", "Wedding"],
        videoType: "Wedding Film",
      },
      {
        date: "OCT 2024",
        location: "INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
        tags: ["India", "Wedding"],
        videoType: "Wedding Film",
      },
      {
        date: "SEP 2024",
        location: "EUROPE",
        groom: "Arjun",
        bride: "Meera",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
        tags: ["Europe", "International"],
        videoType: "Wedding Film",
      },
    ],
  },

  {
    title: "PC Classics",
    section_url: "classics",
    description:
      "Timeless wedding stories that continue to inspire couples and filmmakers.",
    films: [
      {
        date: "OCT 2024",
        location: "INDIA",
        groom: "Rahul",
        bride: "Simran",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
        tags: ["India", "Classic"],
        videoType: "Wedding Film",
      },
      {
        date: "AUG 2024",
        location: "INDIA",
        groom: "Arjun",
        bride: "Meera",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
        tags: ["India", "Classic"],
        videoType: "Wedding Film",
      },
      {
        date: "JUL 2024",
        location: "INDIA",
        groom: "Karan",
        bride: "Riya",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "pink",
        tags: ["India", "Classic"],
        videoType: "Wedding Film",
      },
      {
        date: "MAY 2024",
        location: "INDIA",
        groom: "Kabir",
        bride: "Ishita",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "blue",
        tags: ["India", "Classic"],
        videoType: "Wedding Film",
      },
      {
        date: "APR 2024",
        location: "EUROPE",
        groom: "Daniel",
        bride: "Sofia",
        image: "/pc_logo.png",
        redirect_url:
          "https://youtu.be/3hq_DhGOzik?si=Vz0JiZAuIsrftfKr",
        accent: "purple",
        tags: ["Europe", "International"],
        videoType: "Wedding Film",
      },
    ],
  },
];

function getSection(slug: string) {
  return filmSections.find(
    (section) =>
      section.section_url.toLowerCase() === slug.toLowerCase(),
  );
}

/* -------------------------------------------------------------------------- */
/* Filter Dropdown                                                            */
/* -------------------------------------------------------------------------- */

function FilterDropdown({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: FilterDropdownProps) {
  const hasValue = value !== "All";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`
          flex
          min-w-[145px]
          items-center
          justify-between
          gap-4
          rounded-full
          border
          bg-white
          px-4
          py-2.5
          text-[10px]
          transition
          sm:min-w-[155px]
          sm:px-5
          ${
            hasValue
              ? "border-black text-black"
              : "border-black/10 text-black/70"
          }
          ${open ? "border-black shadow-sm" : ""}
        `}
      >
        <span className="truncate">
          {hasValue ? value : label}
        </span>

        <svg
          viewBox="0 0 20 20"
          className={`
            h-3
            w-3
            shrink-0
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            top-[calc(100%+8px)]
            z-50
            min-w-full
            overflow-hidden
            rounded-[14px]
            border
            border-black/10
            bg-white
            p-1.5
            shadow-[0_12px_35px_rgba(0,0,0,0.12)]
          "
        >
          {options.map((option) => {
            const selected = value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  whitespace-nowrap
                  rounded-[10px]
                  px-3
                  py-2.5
                  text-left
                  text-[10px]
                  transition
                  ${
                    selected
                      ? "bg-black text-white"
                      : "text-black/65 hover:bg-black/[0.04] hover:text-black"
                  }
                `}
              >
                <span>{option}</span>

                {selected && (
                  <svg
                    viewBox="0 0 20 20"
                    className="ml-4 h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 10.5L8 14L16 6" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Film Card                                                                  */
/* -------------------------------------------------------------------------- */

function FilmCard({ film }: { film: Film }) {
  const openFilm = () => {
    if (!film.redirect_url) return;

    window.open(
      film.redirect_url,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <article className="group w-full">
      {/* Image */}
      <div
        className="
          relative
          aspect-[1.72/1]
          w-full
          overflow-hidden
          rounded-[8px]
          bg-[#e9e9e9]
          sm:rounded-[9px]
        "
      >
        <Image
          src={film.image}
          alt={`${film.groom} & ${film.bride} wedding film`}
          fill
          sizes="
            (max-width: 639px) 100vw,
            (max-width: 1023px) 50vw,
            50vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.025]
          "
        />

        {/* Cinematic overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-black/5
          "
        />

        {/* Featured */}
        {film.featured && (
          <div
            className="
              absolute
              left-3
              top-3
              rounded-full
              bg-white/80
              px-3
              py-1.5
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-black/70
              backdrop-blur-md
              sm:left-4
              sm:top-4
            "
          >
            ✦ Featured
          </div>
        )}

        {/* Play */}
        <button
          type="button"
          onClick={openFilm}
          aria-label={`Play ${film.groom} and ${film.bride} wedding film`}
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-[48px]
            w-[48px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-black/55
            text-white
            backdrop-blur-[2px]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-black/70
            sm:h-[54px]
            sm:w-[54px]
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5 fill-current sm:h-[21px] sm:w-[21px]"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      {/* Details */}
      <div className="px-1 pt-3 sm:pt-4">
        {/* Date / Location */}
        <div className="flex items-center gap-2">
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.16em]
              text-black/55
              sm:text-[10px]
            "
          >
            {film.date}
          </span>

          <span className="text-[8px] text-black/25">
            •
          </span>

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.16em]
              text-black/55
              sm:text-[10px]
            "
          >
            {film.location}
          </span>
        </div>

        {/* Couple */}
        <h2
          className="
            mt-1.5
            font-serif
            text-[21px]
            leading-tight
            text-[#111]
            sm:mt-2
            sm:text-[24px]
            lg:text-[25px]
          "
        >
          {film.groom} & {film.bride}
        </h2>

        {/* Tags */}
        {film.tags && film.tags.length > 0 && (
          <div
            className="
              mt-2.5
              flex
              flex-wrap
              gap-1.5
              sm:mt-3
              sm:gap-2
            "
          >
            {film.tags.map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-black/10
                  px-2.5
                  py-1
                  text-[8px]
                  text-black/55
                  sm:px-3
                  sm:text-[9px]
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function FilmDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [culture, setCulture] = useState("All");
  const [location, setLocation] = useState("All");
  const [videoType, setVideoType] = useState("All");
  const [sort, setSort] = useState("Trending");

  const [openFilter, setOpenFilter] = useState<string | null>(
    null,
  );

  const filtersRef = useRef<HTMLDivElement>(null);

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const section = getSection(slug);

  /* ------------------------------------------------------------------------ */
  /* Close dropdown when clicking outside                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Filter options                                                           */
  /* ------------------------------------------------------------------------ */

  const filterOptions = useMemo(() => {
    if (!section) {
      return {
        cultures: ["All"],
        locations: ["All"],
        videoTypes: ["All"],
      };
    }

    const cultures = new Set<string>();
    const locations = new Set<string>();
    const videoTypes = new Set<string>();

    section.films.forEach((film) => {
      film.tags?.forEach((tag) => {
        const normalized = tag.toLowerCase();

        if (
          normalized === "india" ||
          normalized === "europe" ||
          normalized === "international" ||
          normalized === "north india"
        ) {
          cultures.add(tag);
        }
      });

      locations.add(film.location);

      if (film.videoType) {
        videoTypes.add(film.videoType);
      }
    });

    return {
      cultures: ["All", ...Array.from(cultures).sort()],
      locations: ["All", ...Array.from(locations).sort()],
      videoTypes: ["All", ...Array.from(videoTypes).sort()],
    };
  }, [section]);

  /* ------------------------------------------------------------------------ */
  /* Filter + sort films                                                      */
  /* ------------------------------------------------------------------------ */

  const filteredFilms = useMemo(() => {
    if (!section) return [];

    let films = [...section.films];

    /* Culture */
    if (culture !== "All") {
      films = films.filter((film) =>
        film.tags?.some(
          (tag) =>
            tag.toLowerCase() === culture.toLowerCase(),
        ),
      );
    }

    /* Location */
    if (location !== "All") {
      films = films.filter(
        (film) =>
          film.location.toLowerCase() ===
          location.toLowerCase(),
      );
    }

    /* Video type */
    if (videoType !== "All") {
      films = films.filter(
        (film) => film.videoType === videoType,
      );
    }

    /* Sorting */
    if (sort === "Trending") {
      films.sort(
        (a, b) =>
          Number(Boolean(b.featured)) -
          Number(Boolean(a.featured)),
      );
    }

    if (sort === "Featured") {
      films = films.filter((film) => film.featured);
    }

    if (sort === "Latest") {
      films.sort((a, b) => {
        const getYear = (date: string) => {
          const match = date.match(/\d{4}/);
          return match ? Number(match[0]) : 0;
        };

        return getYear(b.date) - getYear(a.date);
      });
    }

    return films;
  }, [
    section,
    culture,
    location,
    videoType,
    sort,
  ]);

  /* ------------------------------------------------------------------------ */
  /* Clear filters                                                            */
  /* ------------------------------------------------------------------------ */

  const hasActiveFilters =
    culture !== "All" ||
    location !== "All" ||
    videoType !== "All" ||
    sort !== "Trending";

  const clearFilters = () => {
    setCulture("All");
    setLocation("All");
    setVideoType("All");
    setSort("Trending");
    setOpenFilter(null);
  };

  /* ------------------------------------------------------------------------ */
  /* Not found                                                                */
  /* ------------------------------------------------------------------------ */

  if (!section) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
        <div className="text-center">
          <p
            className="
              mb-3
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-black/40
            "
          >
            The Wedding Filmer
          </p>

          <h1 className="font-serif text-[38px]">
            Collection not found
          </h1>

          <button
            type="button"
            onClick={() => router.push("/films")}
            className="
              mt-7
              rounded-full
              bg-black
              px-6
              py-3
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-white
              transition
              hover:bg-[#222]
            "
          >
            Back to films
          </button>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Page                                                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <main
      className="
        min-h-screen
        bg-[#fafafa]
        px-5
        pb-16
        pt-5
        sm:px-8
        sm:pb-20
        sm:pt-7
        lg:px-10
        xl:px-12
        2xl:px-16
      "
    >
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/films")}
        className="
          mb-8
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-[#eeeeee]
          px-5
          py-2.5
          text-[11px]
          text-black
          transition
          hover:bg-[#e4e4e4]
          sm:mb-10
        "
      >
        <span className="text-[15px]">
          ←
        </span>

        Back
      </button>

      {/* Header */}
      <header className="mb-8 text-center sm:mb-10 lg:mb-12">
        <p
          className="
            mb-3
            text-[10px]
            uppercase
            tracking-[0.28em]
            text-black/45
          "
        >
          The Wedding Filmer
        </p>

        <h1
          className="
            font-serif
            text-[36px]
            uppercase
            tracking-[0.08em]
            text-black
            sm:text-[44px]
            lg:text-[50px]
          "
        >
          {section.title}
        </h1>

        <div className="mx-auto mt-4 h-px w-10 bg-black/20" />

        {section.description && (
          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-[12px]
              leading-6
              text-black/50
              sm:text-[13px]
            "
          >
            {section.description}
          </p>
        )}
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Filters                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div
        ref={filtersRef}
        className="
          relative
          z-30
          mb-9
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
          sm:mb-11
          sm:gap-3
        "
      >
        {/* Culture */}
        <FilterDropdown
          label="Select Culture"
          value={culture}
          options={filterOptions.cultures}
          open={openFilter === "culture"}
          onToggle={() =>
            setOpenFilter(
              openFilter === "culture"
                ? null
                : "culture",
            )
          }
          onSelect={(value) => {
            setCulture(value);
            setOpenFilter(null);
          }}
        />

        {/* Location */}
        <FilterDropdown
          label="Select Location"
          value={location}
          options={filterOptions.locations}
          open={openFilter === "location"}
          onToggle={() =>
            setOpenFilter(
              openFilter === "location"
                ? null
                : "location",
            )
          }
          onSelect={(value) => {
            setLocation(value);
            setOpenFilter(null);
          }}
        />

        {/* Video Type */}
        <FilterDropdown
          label="Select Video Type"
          value={videoType}
          options={filterOptions.videoTypes}
          open={openFilter === "videoType"}
          onToggle={() =>
            setOpenFilter(
              openFilter === "videoType"
                ? null
                : "videoType",
            )
          }
          onSelect={(value) => {
            setVideoType(value);
            setOpenFilter(null);
          }}
        />

        {/* Trending / Sort */}
        <FilterDropdown
          label="Trending"
          value={sort}
          options={[
            "Trending",
            "Latest",
            "Featured",
          ]}
          open={openFilter === "sort"}
          onToggle={() =>
            setOpenFilter(
              openFilter === "sort"
                ? null
                : "sort",
            )
          }
          onSelect={(value) => {
            setSort(value);
            setOpenFilter(null);
          }}
        />

        {/* Clear */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="
              rounded-full
              px-3
              py-2.5
              text-[10px]
              text-black/45
              transition
              hover:text-black
            "
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Result count                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
          border-b
          border-black/[0.07]
          pb-3
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.16em]
            text-black/40
          "
        >
          {filteredFilms.length}{" "}
          {filteredFilms.length === 1
            ? "Film"
            : "Films"}
        </p>

        {hasActiveFilters && (
          <p className="text-[9px] text-black/35">
            Filters applied
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Films grid                                                          */}
      {/* ------------------------------------------------------------------ */}

      {filteredFilms.length > 0 ? (
        <section>
          <div
            className="
              grid
              grid-cols-1
              gap-x-5
              gap-y-10
              sm:gap-x-6
              sm:gap-y-12
              lg:grid-cols-2
              lg:gap-x-7
              lg:gap-y-14
              xl:gap-x-8
              xl:gap-y-16
              2xl:gap-x-10
            "
          >
            {filteredFilms.map((film, index) => (
              <FilmCard
                key={`${film.groom}-${film.bride}-${index}`}
                film={film}
              />
            ))}
          </div>
        </section>
      ) : (
        /* ---------------------------------------------------------------- */
        /* Empty state                                                       */
        /* ---------------------------------------------------------------- */
        <section
          className="
            flex
            min-h-[300px]
            items-center
            justify-center
            rounded-[12px]
            border
            border-black/[0.06]
            bg-white
          "
        >
          <div className="text-center">
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-black/35
              "
            >
              No films found
            </p>

            <p
              className="
                mt-2
                text-[12px]
                text-black/45
              "
            >
              Try changing your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-5
                rounded-full
                bg-black
                px-6
                py-2.5
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-white
                transition
                hover:bg-[#222]
              "
            >
              Clear filters
            </button>
          </div>
        </section>
      )}

      {/* Bottom */}
      <div className="mt-14 flex justify-center sm:mt-20">
        <button
          type="button"
          onClick={() => router.push("/films")}
          className="
            rounded-full
            border
            border-black/15
            bg-white
            px-7
            py-3
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-black
            transition
            hover:bg-black
            hover:text-white
          "
        >
          View all collections
        </button>
      </div>
    </main>
  );
}
