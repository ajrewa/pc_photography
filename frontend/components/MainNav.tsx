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
      className={`group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:bg-ember-dim ${className}`}
    >
      Enquire
      <ArrowRight
        size={15}
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

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-50
          hidden
          w-[200px]
          lg:flex
          flex-col
          justify-between overflow-hidden bg-[#080808] border-r border-white/[0.07] shadow-[15px_0_50px_rgba(0,0,0,0.35)]
        "
      >
        {/* =================================================
            BACKGROUND LIGHT
        ================================================== */}

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

        {/* =================================================
            TOP
        ================================================== */}

        <div className="relative z-10 px-5 pt-7">
          {/* LOGO */}

          <div className="px-2">
            <Logo variant="light" />

            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-6 bg-[#e64b36]" />

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

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <nav className="mt-12 space-y-2">
            {navItems.map((item, index) => {
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
                    gap-3
                    overflow-hidden
                    rounded-2xl
                    px-3
                    py-3

                    transition-all
                    duration-500

                    ${active
                      ? `
                          /* GLASS SELECTED ITEM */
                          bg-white/[0.10]
                          backdrop-blur-xl
                          border
                          border-white/[0.16]

                          shadow:
                          inset 0 1px 0 rgba(255,255,255,0.10),
                          0 8px 30px rgba(0,0,0,0.25)
                        `
                      : `
                          border border-transparent
                          hover:bg-white/[0.035]
                        `
                    }
                  `}
                >
                  {/* =================================================
                      ACTIVE RED LIGHT
                  ================================================== */}

                  <span
                    className={`
                      absolute
                      left-0
                      top-1/2
                      h-7
                      w-[2px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-[#e64b36]

                      shadow-[0_0_14px_rgba(230,75,54,0.75)]

                      transition-all
                      duration-500

                      ${active
                        ? "scale-y-100 opacity-100"
                        : "scale-y-0 opacity-0"
                      }
                    `}
                  />

                  <span
                    className={`
                      relative
                      z-10
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-xl

                      transition-all
                      duration-500

                      ${active
                        ? `
                            bg-white/[0.07]
                            border
                            border-white/[0.10]
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                            scale-105
                          `
                        : `
                            bg-transparent
                            border
                            border-transparent
                            group-hover:bg-white/[0.04]
                          `
                      }
                    `}
                  >
                    <Icon
                      size={15}
                      strokeWidth={active ? 2.1 : 1.6}
                      className={`
                        transition-all
                        duration-500

                        ${active
                          ? "text-[#e64b36]"
                          : "text-white/40 group-hover:text-white/75"
                        }
                      `}
                    />
                  </span>

                  {/* =================================================
                      LABEL
                  ================================================== */}

                  <span
                    className={`
                      relative
                      z-10
                      flex-1
                      text-[13px]
                      font-medium

                      transition-all
                      duration-300

                      ${active
                        ? "text-white"
                        : "text-white/45 group-hover:text-white/85"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {/* =================================================
                      ACTIVE DOT / ARROW
                  ================================================== */}

                  <span
                    className={`
                      relative
                      z-10
                      text-[10px]

                      transition-all
                      duration-500

                      ${active
                        ? "translate-x-0 text-[#e64b36] opacity-100"
                        : "-translate-x-2 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    ↗
                  </span>

                  {/* =================================================
                      GLASS LIGHT SWEEP
                  ================================================== */}

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

        {/* =====================================================
            ENQUIRY CARD
        ====================================================== */}

        <div className="relative z-10 px-5 pb-6">
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-white/[0.09]
              bg-white/[0.035]
              p-5
              backdrop-blur-xl
              transition-all
              duration-500
              hover:border-white/[0.15]
              hover:bg-white/[0.055]
            "
          >
            {/* Glass reflection */}

            <div
              className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-32
                w-32
                rounded-full
                bg-white/[0.06]
                blur-3xl
                transition-all
                duration-700
                group-hover:bg-[#e64b36]/[0.08]
              "
            />

            {/* Small status */}

            <div className="relative flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[#e64b36]
                    opacity-40
                  "
                />

                <span
                  className="
                    relative
                    h-2
                    w-2
                    rounded-full
                    bg-[#e64b36]
                  "
                />
              </span>

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.28em]
                  text-white/30
                "
              >
                Now Booking
              </span>
            </div>

            {/* Heading */}

            <h3
              className="
                relative
                mt-4
                font-display
                text-[21px]
                italic
                leading-[1.05]
                text-white
              "
            >
              Your story.
              <br />
              <span className="text-white/40">
                Beautifully
                <br />
                captured.
              </span>
            </h3>

            <p
              className="
                relative
                mt-3
                text-[10px]
                leading-relaxed
                text-white/30
              "
            >
              Weddings, emotions and little moments worth remembering.
            </p>

            <EnquireButton
              className="
                relative
                mt-5
                w-full
                justify-center
                transition-all
                duration-500
                group-hover:-translate-y-1
              "
            />
          </div>

          {/* Footer */}

          <div className="mt-4 flex items-center justify-between px-2">
            <span className="text-[7px]uppercase tracking-[0.3em] text-white/20">
              01 — 2026
            </span>

            <span className="h-px w-7 bg-white/10" />

            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-white/20
              "
            >
              Memories
            </span>
          </div>
        </div>
      </aside>

      {/* =====================================================
          ANIMATION
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
      `}</style>
      {/* Desktop top bar: cinematic train search */}

      {!isAdmin && (
        <>
          <div className="fixed inset-x-0 top-0 z-30 hidden lg:left-[230px] lg:flex">
            <div className="relative w-full overflow-hidden bg-paper shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <FloatingSearch />
            </div>
          </div>


          <Link
            href="/admin"
            className="fixed right-[92px] top-5 z-[70] hidden h-14 items-center gap-2 rounded-full border border-white/30 bg-white/70 px-5 text-sm font-medium text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white lg:flex"
          >
            <ShieldCheck size={17} strokeWidth={1.8} />
            Admin
          </Link>
        </>
      )}

      {/* Mobile bottom bar */}
      <div className="mobile-safe-bottom fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <div className="flex items-center justify-between rounded-full bg-ink px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink"
          >
            <MenuIcon size={16} strokeWidth={2.25} />
            Menu
          </button>
          <Link href="/" aria-label="Home" className="shrink-0">
            <span className="font-script text-xl text-paper">PC</span>
          </Link>
          <EnquireButton className="px-5 py-2.5" />
        </div>
      </div>

      {/* Mobile slide-up menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-ink px-5 pb-6 pt-6 transition-transform duration-500 ease-smooth lg:hidden ${open ? "translate-y-0" : "translate-y-full pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink"
          >
            <X size={16} strokeWidth={2.25} />
            Close
          </button>
          <span className="font-script text-2xl text-paper">PC</span>
          <EnquireButton className="px-5 py-2.5" />
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-3 overflow-y-auto">
          {[...navItems, faqItem, adminItem].map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-lg transition-colors duration-300 ${active ? "bg-paper text-ink" : "text-stone-light"
                  }`}
              >
                <Icon
                  size={19}
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

/* =========================================================
   NAV LINK
========================================================= */

function NavLink({
  item,
  active,
}: {
  item: {
    href: string;
    label: string;
  };
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`
        group
        relative
        whitespace-nowrap
        py-2
        text-[10px]
        uppercase
        tracking-[0.15em]
        transition-colors
        duration-300
        ${active
          ? "text-black"
          : "text-black/50 hover:text-black"
        }
      `}
    >
      {item.label}

      <span
        className={`
          absolute
          bottom-0
          left-0
          h-px
          bg-black
          transition-all
          duration-300
          ${active
            ? "w-full"
            : "w-0 group-hover:w-full"
          }
        `}
      />
    </Link>
  );
}