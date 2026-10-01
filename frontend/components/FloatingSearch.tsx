"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FloatingSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    setOpen(false);

    router.push(`/films?search=${encodeURIComponent(value)}`);
  }

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        className={`fixed inset-0 z-[80] bg-black/10 backdrop-blur-[2px] transition-all duration-500 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* =====================================================
          SEARCH CONTAINER
      ===================================================== */}

      <div className="fixed right-6 top-5 z-[90]">
        <div
          className={`
            relative
            transition-all
            duration-500
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              open
                ? "w-[min(620px,calc(100vw-32px))]"
                : "w-14"
            }
          `}
        >
          {/* =================================================
              OPEN / CLOSED BUTTON
          ================================================= */}

          <button
            type="button"
            aria-label={open ? "Close search" : "Open search"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={`
              group absolute z-30 flex items-center justify-center
              rounded-full
              border
              backdrop-blur-xl
              transition-all
              duration-500
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                open
                  ? "right-2 top-2 h-11 w-11 border-black/10 bg-black/80 text-white shadow-lg"
                  : "right-0 top-0 h-14 w-14 border-white/30 bg-white/20 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 hover:bg-white/35"
              }
            `}
          >
            {/* Glass reflection */}
            <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/40 opacity-60" />

            {open ? (
              <X
                size={19}
                strokeWidth={1.8}
                className="relative transition-transform duration-300 group-hover:rotate-90"
              />
            ) : (
              <Search
                size={21}
                strokeWidth={1.7}
                className="relative transition-transform duration-300 group-hover:scale-110"
              />
            )}

            {/* Small camera-style dot */}
            {!open && (
              <span className="absolute right-[10px] top-[9px] h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(216,56,44,0.7)]" />
            )}
          </button>

          {/* =================================================
              EXPANDED GLASS SEARCH
          ================================================= */}

          <div
            className={`
              overflow-hidden
              rounded-[28px]
              border
              border-white/40
              bg-white/[0.14]
              shadow-[0_20px_70px_rgba(0,0,0,0.16)]
              backdrop-blur-2xl
              transition-all
              duration-500
              ease-[cubic-bezier(.22,1,.36,1)]

              ${
                open
                  ? "pointer-events-auto h-[92px] translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none h-0 translate-y-[-10px] scale-95 opacity-0"
              }
            `}
          >
            {/* Inner glass highlight */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-white/[0.08] to-transparent" />

            {/* Top shine */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/70" />

            <form
              onSubmit={handleSearch}
              className="relative flex h-full items-center gap-4 px-5 pr-[68px]"
            >
              {/* Search icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-ink shadow-inner backdrop-blur-md">
                <Search
                  size={19}
                  strokeWidth={1.8}
                />
              </div>

              {/* Input */}
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[8px] font-medium uppercase tracking-[0.28em] text-ink/45">
                  Explore our stories
                </p>

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search wedding films..."
                  className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink/40"
                />
              </div>

              {/* Search submit */}
              <button
                type="submit"
                disabled={!query.trim()}
                aria-label="Search"
                className="
                  group/search
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-ink
                  text-paper
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-ember
                  hover:scale-105
                  disabled:cursor-default
                  disabled:opacity-25
                "
              >
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover/search:-translate-y-0.5 group-hover/search:translate-x-0.5"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}