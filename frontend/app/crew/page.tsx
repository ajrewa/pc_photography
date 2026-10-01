import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Crew — PC Photography" };

const crew = [
  {
    name: "Rohan Mehta",
    role: "Founder & Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Naina Kapoor",
    role: "Lead Cinematographer",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dev Anand",
    role: "Editor & Colorist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Simran Bedi",
    role: "Sound Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CrewPage() {
  return (
    <div className="px-5 py-16 pb-32 sm:px-10 lg:px-16 lg:pb-16">
      <SectionHeading eyebrow="The people" title="A small crew that travels far" />
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {crew.map((c) => (
          <div key={c.name}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
            <h3 className="font-display mt-3 text-xl text-ink">{c.name}</h3>
            <p className="text-xs uppercase tracking-widest text-stone">{c.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
