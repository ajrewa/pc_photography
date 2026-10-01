export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p
        className={`eyebrow inline-flex items-center gap-2 text-xs font-medium uppercase ${
          dark ? "text-paper/60" : "text-stone"
        }`}
      >
        <span className="h-px w-6 bg-ember" />
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-3 text-4xl leading-[1.05] sm:text-5xl ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
