import Link from "next/link";

export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const ring = variant === "light" ? "border-paper text-paper" : "border-ink text-ink";
  return (
    <Link
      href="/"
      // className={`relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border ${ring}`}
      aria-label="PC Photography — home"
    >
      <img src="/pc_logo.png" alt="" className="h-30 w-40" />
    </Link>
  );
}
50