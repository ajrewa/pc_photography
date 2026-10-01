"use client";

import { useEffect, useState } from "react";

const TOTAL_MS = 3000;
const EXIT_MS = 700;
const WORDMARK = "PC PHOTOGRAPHY";

export default function SplashScreen() {
  const [count, setCount] = useState(3);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const tick = setInterval(() => {
      setCount((c) => (c > 1 ? c - 1 : 1));
    }, 1000);

    const exitTimer = setTimeout(() => setExiting(true), TOTAL_MS);
    const hideTimer = setTimeout(() => {
      setHidden(true);
      document.documentElement.style.overflow = "";
    }, TOTAL_MS + EXIT_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden={exiting}
      style={{
        clipPath: exiting ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: `clip-path ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      {/* lens ring */}
      <div className="relative flex h-36 w-36 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border border-dashed border-sand/40"
          style={{ animation: "irisRingSpin 6s linear infinite" }}
        />
        <div className="absolute inset-3 rounded-full border border-paper/15" />
        <div
          className="absolute inset-0"
          style={{ animation: "irisRingSpin 9s linear infinite reverse" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-3 w-[1.5px] bg-sand/50"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-64px)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>

        <span
          key={count}
          className="font-display text-5xl text-paper"
          style={{ animation: "splashNumberPop 1s ease-out" }}
        >
          {count}
        </span>
      </div>

      {/* wordmark */}
      <div className="mt-8 flex gap-[2px] overflow-hidden sm:gap-1">
        {WORDMARK.split("").map((char, i) => (
          <span
            key={i}
            className="font-display inline-block text-2xl tracking-[0.15em] text-paper sm:text-4xl"
            style={{
              animation: "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${0.4 + i * 0.045}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <p
        className="font-ital mt-3 text-sm italic tracking-widest text-stone-light"
        style={{ animation: "fadeIn 1s ease both", animationDelay: "1.4s" }}
      >
        Cinematic Wedding Films
      </p>

      {/* progress bar */}
      <div className="absolute bottom-14 h-[2px] w-40 overflow-hidden rounded-full bg-paper/15 sm:w-56">
        <div
          className="h-full origin-left bg-ember"
          style={{ animation: `splashProgress ${TOTAL_MS}ms linear forwards` }}
        />
      </div>
    </div>
  );
}