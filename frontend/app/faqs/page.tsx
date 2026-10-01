import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "FAQs — PC Photography" };

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "Most couples book 9–12 months ahead, especially for peak season (October–February) and destination weddings.",
  },
  {
    q: "Do you travel outside India?",
    a: "Yes — about half of our weddings each year are outside India. Travel and accommodation are added to the quote.",
  },
  {
    q: "How long until we get our film?",
    a: "The highlight film arrives in 4–6 weeks. The full-length feature and raw footage follow within 10–12 weeks.",
  },
  {
    q: "Can we choose the music?",
    a: "We license all music ourselves to keep your film free of copyright strikes, but we always welcome song suggestions.",
  },
  {
    q: "Do you also shoot photos?",
    a: "We're a film-only crew, but we work alongside your photographer on the day and can recommend a few we trust.",
  },
];

export default function FAQsPage() {
  return (
    <div className="px-5 py-16 pb-32 sm:px-10 lg:px-16 lg:pb-16">
      <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
      <div className="mt-10 divide-y divide-black/10 border-t border-black/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
              <span className="font-display text-xl text-ink sm:text-2xl">{f.q}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/15 text-ink transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
