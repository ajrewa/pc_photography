"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type JourneyItem = {
  year: string;
  title: string;
  location: string;
  description: string;
  image: string;
  side: "left" | "right";
};

const journey: JourneyItem[] = [
  {
    year: "2012",
    title: "The Beginning",
    location: "Mumbai, India",
    description:
      "It started with a camera, a few weddings and an obsession with telling stories differently. Every celebration became an opportunity to capture something honest, emotional and completely personal.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    side: "right",
  },
  {
    year: "2014",
    title: "Finding Our Voice",
    location: "Delhi, India",
    description:
      "The work began moving beyond traditional wedding photography. We started looking for the quiet moments between the big ones — glances, laughter, nervous hands and everything that makes a wedding feel real.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    side: "left",
  },
  {
    year: "2016",
    title: "A New Perspective",
    location: "Rajasthan, India",
    description:
      "Destination celebrations brought new landscapes, cultures and stories. Weddings became cinematic journeys, with every frame designed to feel like a memory rather than simply a photograph.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    side: "right",
  },
  {
    year: "2018",
    title: "Beyond India",
    location: "Udaipur, India",
    description:
      "Our stories travelled across borders. From intimate European celebrations to elaborate destination weddings, the language remained the same — emotion first, everything else second.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop",
    side: "left",
  },
  {
    year: "2020",
    title: "Stories That Stayed",
    location: "Goa, India",
    description:
      "A changing world made us appreciate the smallest moments even more. Intimate celebrations became some of our most meaningful stories, reminding us that a wedding is ultimately about people.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop",
    side: "right",
  },
  {
    year: "2022",
    title: "The Next Chapter",
    location: "Jaipur, India",
    description:
      "Photography evolved into a complete visual language. Films, photographs and sound came together to create wedding stories that could be experienced again and again.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    side: "left",
  },
  {
    year: "2024",
    title: "Stories Without Borders",
    location: "Lake Como, Italy",
    description:
      "Today, every wedding is approached as its own world. Different people, different cultures and different places — but always the same pursuit: creating something that feels timeless.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    side: "right",
  },
  {
    year: "2026",
    title: "What's Next",
    location: "Worldwide",
    description:
      "The journey continues. New places, new couples and new ways of seeing. The camera remains the same, but the stories keep changing.",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2000&auto=format&fit=crop",
    side: "left",
  },
];

export default function PhotographerJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const roadRef = useRef<HTMLDivElement>(null);

  /*
   * Automatic journey:
   *
   * 2012 → 2014 → 2016 → ... → 2026 → 2012
   */
  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= journey.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  /*
   * Keep selected village visible on mobile.
   */
  useEffect(() => {
    const road = roadRef.current;

    if (!road) return;

    const village = road.children[
      activeIndex
    ] as HTMLElement | undefined;

    if (!village) return;

    village.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  const active = journey[activeIndex];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f3ee]">
      {/* backbutton */}
      <div className="my-4 ml-4 flex justify-left">
        <a
          href="/"
          className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-100"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
            <ArrowLeft size={15} />
          </span>
          Back
        </a>
      </div>

      <section
        className="
          relative
          flex
          min-h-[calc(100vh-185px)]
          items-center
          px-5
          pb-[230px]
          pt-16
          sm:px-8
          sm:pb-[250px]
          lg:px-12
          lg:pb-[270px]
          xl:px-20
        "
      >
        {/* Giant background year */}
        <div
          key={`bg-${active.year}`}
          className="
            pointer-events-none
            absolute
            right-[-30px]
            top-[-20px]
            select-none
            font-serif
            text-[170px]
            leading-none
            text-black/[0.025]
            sm:text-[260px]
            lg:right-[5%]
            lg:text-[360px]
          "
        >
          {active.year}
        </div>

        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-black/40
              "
            >
              The Photographer's Journey
            </p>

            <div className="mt-4 h-px w-10 bg-black/20" />
          </div>

          {/* Story */}
          <div
            key={active.year}
            className="
              grid
              items-center
              gap-9
              animate-[journeyFade_700ms_ease]
              lg:grid-cols-2
              lg:gap-16
              xl:gap-24
            "
          >
            {/* Text when left */}
            {active.side === "left" && (
              <JourneyText item={active} />
            )}

            {/* Image */}
            <div
              className={`
                relative
                overflow-hidden
                rounded-[5px]
                ${
                  active.side === "left"
                    ? "lg:order-2"
                    : "lg:order-1"
                }
              `}
            >
              <div
                className="
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  bg-[#dedbd5]
                  sm:aspect-[16/10]
                "
              >
                <Image
                  src={active.image}
                  alt={`${active.year} ${active.title}`}
                  fill
                  priority
                  sizes="
                    (max-width: 1023px) 100vw,
                    50vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-[1400ms]
                    ease-out
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/35
                    via-transparent
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    font-serif
                    text-[50px]
                    leading-none
                    text-white
                    drop-shadow-lg
                    sm:bottom-7
                    sm:left-7
                    sm:text-[65px]
                  "
                >
                  {active.year}
                </div>
              </div>
            </div>

            {/* Text when right */}
            {active.side === "right" && (
              <div className="lg:order-2">
                <JourneyText item={active} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* ROAD JOURNEY                                                     */}
      {/* ================================================================ */}

      <RoadJourney
        journey={journey}
        activeIndex={activeIndex}
        setActiveIndex={(index) => {
          setActiveIndex(index);
          setIsPlaying(false);

          /*
           * Resume automatic playback after manual selection.
           */
          window.setTimeout(() => {
            setIsPlaying(true);
          }, 7000);
        }}
        roadRef={roadRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* Animation */}
      <style jsx global>{`
        @keyframes journeyFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .journey-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .journey-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}

/* ======================================================================== */
/* ROAD JOURNEY                                                             */
/* ======================================================================== */

function RoadJourney({
  journey,
  activeIndex,
  setActiveIndex,
  roadRef,
  isPlaying,
  setIsPlaying,
}: {
  journey: JourneyItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  roadRef: React.RefObject<HTMLDivElement>;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}) {
  return (
    <section
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        overflow-hidden
        border-t
        border-black/10
        bg-[#eeeae1]
      "
    >
      {/* Top controls */}
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-5
          pb-3
          pt-3
          sm:px-8
          lg:px-12
          xl:px-20
        "
      >
        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-black/40
            "
          >
            Our journey
          </p>

          <p className="mt-0.5 font-serif text-[15px] text-black">
            {journey[activeIndex].year}
            <span className="ml-2 text-[10px] text-black/40">
              {journey[activeIndex].location}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-black/10
            bg-white
            text-black
            transition
            hover:bg-black
            hover:text-white
          "
          aria-label={
            isPlaying ? "Pause journey" : "Play journey"
          }
        >
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-current"
            >
              <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-3.5 w-3.5 fill-current"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* ================================================================ */}
      {/* ROAD                                                             */}
      {/* ================================================================ */}

      <div className="relative h-[118px] w-full overflow-hidden">
        {/* Village / landscape background */}
        <div className="pointer-events-none absolute inset-0">
          {/* distant hills */}
          <div
            className="
              absolute
              bottom-[69px]
              left-0
              h-10
              w-full
              bg-[#d9d3c6]
              [clip-path:polygon(0_100%,8%_50%,15%_75%,25%_30%,34%_65%,43%_25%,53%_65%,63%_35%,72%_65%,82%_25%,91%_65%,100%_35%,100%_100%)]
            "
          />

          {/* grass */}
          <div
            className="
              absolute
              bottom-[51px]
              left-0
              h-8
              w-full
              bg-[#c4c8ad]
            "
          />

          {/* small trees */}
          <div className="absolute bottom-[61px] left-[7%]">
            <Tree />
          </div>

          <div className="absolute bottom-[59px] left-[18%]">
            <Tree small />
          </div>

          <div className="absolute bottom-[60px] left-[34%]">
            <Tree />
          </div>

          <div className="absolute bottom-[59px] left-[61%]">
            <Tree small />
          </div>

          <div className="absolute bottom-[61px] right-[15%]">
            <Tree />
          </div>

          <div className="absolute bottom-[60px] right-[4%]">
            <Tree small />
          </div>
        </div>

        {/* Road */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-[67px]
            w-full
            bg-[#3e3d3a]
          "
        >
          {/* Road edge */}
          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-[3px]
              bg-[#d8d3c8]
            "
          />

          {/* White road stripes */}
          <div
            className="
              absolute
              left-0
              right-0
              top-[31px]
              h-[5px]
              opacity-90
            "
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #fff 0px, #fff 48px, transparent 48px, transparent 90px)",
            }}
          />

          {/* Bottom road edge */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-[2px]
              bg-black/20
            "
          />
        </div>

        {/* ============================================================ */}
        {/* HORIZONTAL VILLAGE JOURNEY                                    */}
        {/* ============================================================ */}

        <div
          ref={roadRef}
          className="
            journey-scrollbar
            absolute
            inset-x-0
            bottom-0
            z-20
            flex
            h-[118px]
            min-w-full
            items-end
            overflow-x-auto
            px-[8vw]
          "
        >
          {journey.map((item, index) => {
            const selected =
              activeIndex === index;

            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="
                  group
                  relative
                  h-full
                  min-w-[125px]
                  shrink-0
                  outline-none
                  sm:min-w-[155px]
                  lg:min-w-[180px]
                "
              >
                {/* ==================================================== */}
                {/* VILLAGE PILLAR                                        */}
                {/* ==================================================== */}

                <div
                  className={`
                    absolute
                    bottom-[53px]
                    left-1/2
                    flex
                    -translate-x-1/2
                    flex-col
                    items-center
                    transition-all
                    duration-500
                    ${
                      selected
                        ? "-translate-y-2"
                        : "group-hover:-translate-y-1"
                    }
                  `}
                >
                  {/* Village sign */}
                  <div
                    className={`
                      relative
                      rounded-[2px]
                      border
                      px-3
                      py-2
                      shadow-[0_3px_8px_rgba(0,0,0,0.12)]
                      transition-all
                      duration-300
                      ${
                        selected
                          ? "border-black bg-[#fffdf8]"
                          : "border-black/15 bg-[#e9e5da]"
                      }
                    `}
                  >
                    {/* Small top decoration */}
                    <div
                      className={`
                        absolute
                        -top-[5px]
                        left-1/2
                        h-[5px]
                        w-[18px]
                        -translate-x-1/2
                        ${
                          selected
                            ? "bg-black"
                            : "bg-black/25"
                        }
                      `}
                    />

                    <p
                      className={`
                        whitespace-nowrap
                        font-serif
                        text-[18px]
                        leading-none
                        ${
                          selected
                            ? "text-black"
                            : "text-black/55"
                        }
                      `}
                    >
                      {item.year}
                    </p>

                    <p
                      className={`
                        mt-1
                        max-w-[95px]
                        truncate
                        text-[6px]
                        uppercase
                        tracking-[0.1em]
                        ${
                          selected
                            ? "text-black/60"
                            : "text-black/30"
                        }
                      `}
                    >
                      {item.location}
                    </p>

                    {/* Sign post */}
                    <div
                      className="
                        absolute
                        left-1/2
                        top-full
                        h-[20px]
                        w-[3px]
                        -translate-x-1/2
                        bg-[#5a5045]
                      "
                    />
                  </div>
                </div>

                {/* ==================================================== */}
                {/* CAR                                                     */}
                {/* ==================================================== */}

                {selected && (
                  <div
                    className="
                      absolute
                      bottom-[20px]
                      left-1/2
                      z-30
                      -translate-x-1/2
                      animate-[carBounce_1s_ease-in-out_infinite]
                    "
                  >
                    <Car />
                  </div>
                )}

                {/* Road marker */}
                <div
                  className={`
                    absolute
                    bottom-[30px]
                    left-1/2
                    h-[6px]
                    w-[6px]
                    -translate-x-1/2
                    rounded-full
                    ${
                      selected
                        ? "bg-white"
                        : "bg-white/30"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes carBounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }

          50% {
            transform: translateX(-50%) translateY(-2px);
          }
        }
      `}</style>
    </section>
  );
}

/* ======================================================================== */
/* CAR                                                                      */
/* ======================================================================== */

function Car() {
  return (
    <div className="relative h-[25px] w-[48px]">
      {/* Shadow */}
      <div
        className="
          absolute
          bottom-[-3px]
          left-1/2
          h-[5px]
          w-[40px]
          -translate-x-1/2
          rounded-full
          bg-black/30
          blur-[2px]
        "
      />

      {/* Body */}
      <div
        className="
          absolute
          bottom-[5px]
          left-[3px]
          h-[12px]
          w-[42px]
          rounded-[5px]
          bg-[#d92828]
          shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)]
        "
      />

      {/* Roof */}
      <div
        className="
          absolute
          bottom-[14px]
          left-[12px]
          h-[9px]
          w-[23px]
          rounded-t-[7px]
          bg-[#c52222]
        "
      />

      {/* Windows */}
      <div
        className="
          absolute
          bottom-[16px]
          left-[15px]
          h-[5px]
          w-[8px]
          rounded-tl-[4px]
          bg-[#a9c3cc]
        "
      />

      <div
        className="
          absolute
          bottom-[16px]
          right-[11px]
          h-[5px]
          w-[8px]
          rounded-tr-[4px]
          bg-[#a9c3cc]
        "
      />

      {/* Wheels */}
      <div
        className="
          absolute
          bottom-[1px]
          left-[8px]
          h-[8px]
          w-[8px]
          rounded-full
          border-2
          border-[#222]
          bg-[#777]
        "
      />

      <div
        className="
          absolute
          bottom-[1px]
          right-[8px]
          h-[8px]
          w-[8px]
          rounded-full
          border-2
          border-[#222]
          bg-[#777]
        "
      />

      {/* Headlight */}
      <div
        className="
          absolute
          right-[2px]
          top-[9px]
          h-[3px]
          w-[3px]
          rounded-full
          bg-[#ffe9a6]
        "
      />
    </div>
  );
}

/* ======================================================================== */
/* TREE                                                                     */
/* ======================================================================== */

function Tree({
  small = false,
}: {
  small?: boolean;
}) {
  return (
    <div
      className={`relative ${
        small ? "h-[25px] w-[20px]" : "h-[35px] w-[28px]"
      }`}
    >
      {/* Trunk */}
      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-[14px]
          w-[4px]
          -translate-x-1/2
          bg-[#76604c]
        "
      />

      {/* Leaves */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[20px]
          w-[20px]
          -translate-x-1/2
          rounded-full
          bg-[#7d8d63]
        "
      />

      <div
        className="
          absolute
          left-[2px]
          top-[7px]
          h-[15px]
          w-[15px]
          rounded-full
          bg-[#8c9a6f]
        "
      />

      <div
        className="
          absolute
          right-[1px]
          top-[6px]
          h-[16px]
          w-[16px]
          rounded-full
          bg-[#71805a]
        "
      />
    </div>
  );
}

/* ======================================================================== */
/* JOURNEY TEXT                                                             */
/* ======================================================================== */

function JourneyText({
  item,
}: {
  item: JourneyItem;
}) {
  return (
    <div className="max-w-xl">
      <p
        className="
          font-serif
          text-[54px]
          leading-none
          text-black
          sm:text-[70px]
          lg:text-[82px]
        "
      >
        {item.year}
      </p>

      <p
        className="
          mt-5
          text-[9px]
          uppercase
          tracking-[0.28em]
          text-black/40
        "
      >
        {item.location}
      </p>

      <h1
        className="
          mt-3
          font-serif
          text-[38px]
          leading-[1]
          text-black
          sm:text-[48px]
          lg:text-[56px]
        "
      >
        {item.title}
      </h1>

      <div className="my-7 h-px w-12 bg-black/20" />

      <p
        className="
          max-w-lg
          text-[14px]
          leading-[1.9]
          text-black/55
          sm:text-[15px]
          lg:text-[16px]
        "
      >
        {item.description}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <span className="h-px w-8 bg-black/20" />

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.22em]
            text-black/35
          "
        >
          A chapter in the story
        </span>
      </div>
    </div>
  );
}
