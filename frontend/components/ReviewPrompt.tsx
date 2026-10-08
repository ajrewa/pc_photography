"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Star, X } from "lucide-react";

const DISMISSED_KEY = "pc-review-prompt-dismissed";

export default function ReviewPrompt() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/reviews" || window.localStorage.getItem(DISMISSED_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 10_000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function dismiss() {
    window.localStorage.setItem(DISMISSED_KEY, "true");
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-prompt-title"
        className="relative w-full max-w-md rounded-[28px] border border-black/10 bg-paper p-7 text-center shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close review prompt"
          className="absolute right-4 top-4 rounded-full p-2 text-stone transition hover:bg-black/5 hover:text-ink"
        >
          <X size={18} />
        </button>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ember/10 text-ember">
          <Star size={22} className="fill-ember" />
        </span>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone">Your experience matters</p>
        <h2 id="review-prompt-title" className="mt-2 font-display text-3xl text-ink">
          Enjoying our stories?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone">
          Share a rating and a few words to help other couples find their wedding film team.
        </p>
        <Link
          href="/reviews"
          onClick={dismiss}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-ember"
        >
          Give a review
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
