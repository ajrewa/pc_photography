import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { navItems, faqItem } from "@/lib/nav";

export default function Footer() {
  return null
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-32 pt-20 text-paper sm:px-10 lg:px-16 lg:pb-20">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/87806-601467089.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-ink/80" />

      {/* Footer Content */}
      <div className="relative z-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="font-script text-3xl text-paper">
              PC Photography
            </span>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-light">
              Cinematic wedding films for couples who want their story told
              with patience, light, and a little bit of nerve. Based everywhere
              the next flight is going.
            </p>

            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-stone-light transition-colors hover:border-ember hover:text-ember"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-xs font-medium uppercase text-stone">
              Explore
            </p>

            <ul className="mt-4 space-y-3 text-sm text-stone-light">
              {[...navItems, faqItem].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-xs font-medium uppercase text-stone">
              Get in touch
            </p>

            <ul className="mt-4 space-y-3 text-sm text-stone-light">
              <li>hello@theweddingfilmer.com</li>
              <li>+91 98765 43210</li>
              <li>Mumbai &middot; Available worldwide</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-stone sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} PC Photography. All rights
            reserved.
          </p>

          <p>
            Designed for couples who elope, marry big, and everything between.
          </p>
        </div>
      </div>
    </footer>
  );
}