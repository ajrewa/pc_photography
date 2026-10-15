"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type PcLoaderProps = {
  show?: boolean;
  label?: string;
};

export default function Loader({ show = true, label = "Loading" }: PcLoaderProps) {
  // small delay after mount so the fade-in actually plays
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const visible = show && ready;

  // lock page scroll while loader is visible
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={visible}
      onContextMenu={(e) => e.preventDefault()}
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-neutral-950/50 backdrop-blur-xl backdrop-saturate-150",
        "transition-[opacity,visibility] duration-500 ease-out",
        visible ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="relative grid h-56 w-56 place-items-center select-none">
        {/* faint glass track */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-white/10"
        />

        {/* rotating comet arc */}
        <span
          aria-hidden="true"
          className="
            absolute inset-0 rounded-full
            animate-spin motion-reduce:animate-none [animation-duration:1.4s]
            bg-[conic-gradient(from_0deg,transparent_0deg,rgb(255_255_255/0.95)_360deg)]
            [mask-image:radial-gradient(farthest-side,transparent_calc(100%_-_3px),#000_calc(100%_-_3px))]
          "
        />

        {/* logo */}
        <Image
          src="/pc_logo.png"
          alt="PC Photography"
          width={160}
          height={101}
          priority
          draggable={false}
          className="pointer-events-none h-auto w-36 animate-pulse motion-reduce:animate-none"
        />
      </div>

      <span className="sr-only">{label}</span>
    </div>
  );
}