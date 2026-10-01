import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Workshop — PC Photography" };

export default function WorkshopPage() {
  return (
    <div className="pb-32 lg:pb-0">
      <section className="grid gap-10 px-5 py-16 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-24">
        <div>
          <SectionHeading eyebrow="Learn with us" title="A two-day workshop on shooting real love" />
          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone">
            Twice a year we open our process to twelve filmmakers: how we
            light a candlelit sangeet, how we direct without directing, and
            how we cut a five-day wedding into a six-minute film.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ember-dim"
            >
              Apply for a seat
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
          <Image
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1600&auto=format&fit=crop"
            alt="Workshop participants filming a wedding"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Upcoming dates" title="Two sessions left this year" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            { city: "Udaipur, India", date: "12–13 October 2026", seats: "4 seats left" },
            { city: "Lake Como, Italy", date: "8–9 March 2027", seats: "9 seats left" },
          ].map((s) => (
            <div key={s.city} className="rounded-3xl border border-black/10 p-8">
              <p className="font-display text-2xl text-ink">{s.city}</p>
              <p className="mt-2 text-sm text-stone">{s.date}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-ember">{s.seats}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
