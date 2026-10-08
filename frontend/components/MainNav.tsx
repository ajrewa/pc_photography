"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X, Menu as MenuIcon, ShieldCheck } from "lucide-react";
import { navItems, faqItem, adminItem } from "@/lib/nav";
import Logo from "./Logo";
import FloatingSearch from "./FloatingSearch";

function EnquireButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`group inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-xs font-medium text-paper transition-colors duration-300 hover:bg-ember-dim ${className}`}
    >
      Enquire
      <ArrowRight
        size={14}
        strokeWidth={2.25}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

export default function MainNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-50
          hidden
          h-full
          w-[200px]
          lg:flex
          flex-col
          justify-between
          overflow-hidden
          bg-[#080808]
          border-r
          border-white/[0.07]
          shadow-[15px_0_50px_rgba(0,0,0,0.35)]
        "
      >
        {/* BACKGROUND GLOW LIGHTS */}
        <div
          className="
            pointer-events-none
            absolute
            -left-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-white/[0.025]
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-20
            h-72
            w-72
            rounded-full
            bg-[#e64b36]/[0.045]
            blur-[110px]
          "
        />

        {/* TOP SECTION: LOGO + SCROLLABLE NAV */}
        <div className="relative z-10 flex flex-col flex-1 min-h-0 px-4 pt-6">
          {/* LOGO HEADER */}
          <div className="px-2 shrink-0">
            <Logo variant="light" />

            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-5 bg-[#e64b36]" />
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.35em]
                  text-white/35
                "
              >
                Visual Stories
              </span>
            </div>
          </div>

          {/* NAVIGATION (Flex-1 + overflow-y-auto ensures vertical height adaptation) */}
          <nav
            className="
              mt-6
              flex-1
              min-h-0
              space-y-1.5
              overflow-y-auto
              pr-1
              scrollbar-thin
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-2.5
                    overflow-hidden
                    rounded-xl
                    px-2.5
                    py-2
                    transition-all
                    duration-300
                    ${
                      active
                        ? `
                          bg-white/[0.10]
                          backdrop-blur-xl
                          border
                          border-white/[0.16]
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_30px_rgba(0,0,0,0.25)]
                        `
                        : `
                          border border-transparent
                          hover:bg-white/[0.035]
                        `
                    }
                  `}
                >
                  {/* ACTIVE RED LIGHT */}
                  <span
                    className={`
                      absolute
                      left-0
                      top-1/2
                      h-6
                      w-[2px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-[#e64b36]
                      shadow-[0_0_14px_rgba(230,75,54,0.75)]
                      transition-all
                      duration-300
                      ${
                        active
                          ? "scale-y-100 opacity-100"
                          : "scale-y-0 opacity-0"
                      }
                    `}
                  />

                  {/* ICON */}
                  <span
                    className={`
                      relative
                      z-10
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      duration-300
                      ${
                        active
                          ? `
                            bg-white/[0.07]
                            border
                            border-white/[0.10]
                            scale-105
                          `
                          : `
                            bg-transparent
                            group-hover:bg-white/[0.04]
                          `
                      }
                    `}
                  >
                    <Icon
                      size={14}
                      strokeWidth={active ? 2.1 : 1.6}
                      className={`
                        transition-all
                        duration-300
                        ${
                          active
                            ? "text-[#e64b36]"
                            : "text-white/40 group-hover:text-white/75"
                        }
                      `}
                    />
                  </span>

                  {/* LABEL */}
                  <span
                    className={`
                      relative
                      z-10
                      flex-1
                      truncate
                      text-xs
                      font-medium
                      transition-all
                      duration-300
                      ${
                        active
                          ? "text-white"
                          : "text-white/45 group-hover:text-white/85"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {/* ARROW */}
                  <span
                    className={`
                      relative
                      z-10
                      text-[9px]
                      transition-all
                      duration-300
                      ${
                        active
                          ? "translate-x-0 text-[#e64b36] opacity-100"
                          : "-translate-x-1.5 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    ↗
                  </span>

                  {/* GLASS SWEEP */}
                  {active && (
                    <span
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        -left-[80%]
                        w-[55%]
                        skew-x-[-25deg]
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.12]
                        to-transparent
                        animate-[glassSweep_4s_ease-in-out_infinite]
                      "
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: ENQUIRY CARD + FOOTER */}
        <div className="relative z-10 shrink-0 px-4 pb-4 pt-2">
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.09]
              bg-white/[0.035]
              p-4
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-white/[0.15]
              hover:bg-white/[0.055]
            "
          >
            {/* Ambient Reflection */}
            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-24
                w-24
                rounded-full
                bg-white/[0.06]
                blur-2xl
                transition-all
                duration-500
                group-hover:bg-[#e64b36]/[0.08]
              "
            />

            {/* Status indicator */}
            <div className="relative flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#e64b36] opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-[#e64b36]" />
              </span>

              <span className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                Now Booking
              </span>
            </div>

            {/* Heading */}
            <h3 className="relative mt-2 font-display text-[17px] italic leading-tight text-white">
              Your story.
              <br />
              <span className="text-white/40">Captured.</span>
            </h3>

            <p className="relative mt-1 text-[9.5px] leading-relaxed text-white/30">
              Weddings & little moments worth remembering.
            </p>

            <EnquireButton className="relative mt-3 w-full justify-center text-xs py-2" />
          </div>

          {/* Footer Metadata */}
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[7px] uppercase tracking-[0.25em] text-white/20">
              01 — 2026
            </span>

            <span className="h-px w-5 bg-white/10" />

            <span className="text-[7px] uppercase tracking-[0.25em] text-white/20">
              Memories
            </span>
          </div>
        </div>
      </aside>

      {/* =====================================================
          ANIMATIONS & STYLES
      ====================================================== */}
      <style jsx global>{`
        @keyframes glassSweep {
          0% {
            left: -80%;
          }
          45%,
          100% {
            left: 150%;
          }
        }

        /* Webkit custom scrollbars for navigation sidebar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>

      {/* Top Header Floating Search for Desktop */}
      {!isAdmin && (
        <>
          <div className="fixed inset-x-0 top-0 z-30 hidden lg:left-[200px] lg:flex">
            <div className="relative w-full overflow-hidden bg-paper shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <FloatingSearch />
            </div>
          </div>

          <Link
            href="/admin"
            className="fixed right-6 top-4 z-[70] hidden h-11 items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 text-xs font-medium text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white lg:flex"
          >
            <ShieldCheck size={15} strokeWidth={1.8} />
            Admin
          </Link>
        </>
      )}

      {/* =====================================================
          MOBILE BOTTOM BAR
      ====================================================== */}
      <div className="mobile-safe-bottom fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <div className="flex items-center justify-between rounded-full bg-ink px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink"
          >
            <MenuIcon size={15} strokeWidth={2.25} />
            Menu
          </button>

          <Link href="/" aria-label="Home" className="shrink-0">
            <span className="font-script text-xl text-paper">PC</span>
          </Link>

          <EnquireButton className="px-4 py-2 text-xs" />
        </div>
      </div>

      {/* =====================================================
          MOBILE SLIDE-UP MENU
      ====================================================== */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-ink px-5 pb-6 pt-6 transition-transform duration-500 ease-smooth lg:hidden ${
          open ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink"
          >
            <X size={15} strokeWidth={2.25} />
            Close
          </button>
          <span className="font-script text-2xl text-paper">PC</span>
          <EnquireButton className="px-4 py-2 text-xs" />
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-2 overflow-y-auto min-h-0 pr-1">
          {[...navItems, faqItem, adminItem].map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-base transition-colors duration-300 ${
                  active ? "bg-paper text-ink" : "text-stone-light"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={active ? "text-ember" : "text-stone"}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}