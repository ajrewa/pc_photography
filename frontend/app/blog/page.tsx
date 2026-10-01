import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Blog & Press — PC Photography" };

const posts = [
  {
    title: "Five things to ask before you book a wedding filmmaker",
    tag: "Advice",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "As seen in Vogue: the year weddings got smaller",
    tag: "Press",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Behind the edit: cutting Arya & Federico's film",
    tag: "Process",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="px-5 py-16 pb-32 sm:px-10 lg:px-16 lg:pb-16">
      <SectionHeading eyebrow="Blog & press" title="Notes from the field" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group cursor-pointer">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest text-ember">{p.tag}</p>
            <h3 className="font-display mt-1 text-xl leading-snug text-ink">{p.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}
