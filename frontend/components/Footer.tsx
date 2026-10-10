"use client";

import {
  ArrowRight, ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import Link from "next/link";


const contacts = [
  {
    label: "PHONE",
    icon: Phone,
    content: (
      <>
        <Link href="tel:+917745934522">+91 7745934522</Link>
        <Link href="tel:+918225078977">+91 8225078977</Link>
      </>
    ),
  },
  {
    label: "THE STUDIO",
    icon: MapPin,
    content: (
      <address className="not-italic">
        Astha Bungalow no. 30, JP Rd, Tejaji Nagar Part 2,
        Indore, Madhya Pradesh 452001, India
      </address>
    ),
  },
  {
    label: "EMAIL",
    icon: Mail,
    content: (
      <a href="mailto:info@photography.co.in">
        info@photography.co.in
      </a>
    ),
  },
];

const orbitPeople = [
  { position: "left-[32%] top-[4%]", color: "bg-emerald-700" },
  { position: "left-[65%] top-[13%]", color: "bg-amber-700" },
  { position: "left-[83%] top-[35%]", color: "bg-rose-700" },
  { position: "left-[72%] top-[64%]", color: "bg-sky-700" },
  { position: "left-[43%] top-[81%]", color: "bg-orange-700" },
  { position: "left-[26%] top-[44%]", color: "bg-violet-700" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f4f5f6] px-3 py-5 text-white sm:px-5 sm:py-8">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[32px] border-[7px] border-white bg-[#151a1c] shadow-2xl sm:rounded-[42px] sm:border-[10px]">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/87806-601467089.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/footer-poster.jpg"
        />

        {/* Readability overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/45 to-black/90" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-6 pt-8 sm:px-8 sm:pb-9 sm:pt-12 lg:px-14 lg:pb-10 lg:pt-16">
          {/* Main CTA card */}
          <div className="relative isolate overflow-hidden rounded-[24px] border border-white/25 bg-white/[0.10] shadow-2xl backdrop-blur-xl sm:rounded-[32px]">
            <div className="grid min-h-[290px] items-center md:grid-cols-[1.1fr_0.9fr] lg:min-h-[350px]">
              {/* CTA content */}
              <div className="relative z-10 px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
                <p className="mb-4 text-xs font-medium tracking-[0.18em] text-white/65">
                  GET IN TOUCH
                </p>

                <h2 className="max-w-xl text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
                  Let&apos;s Create Something Beautiful
                </h2>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                  Every love story deserves to be remembered.
                  Let&apos;s capture your wedding, your emotions,
                  and the little moments that last forever.
                </p>

                <Link
                  href="/contact"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-medium text-black transition duration-300 hover:scale-[1.03] hover:bg-neutral-200"
                >
                  Enquire Now
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </div>

              {/* Decorative orbit graphic */}
              <div className="relative hidden h-[330px] items-center justify-center overflow-hidden md:flex lg:h-[350px]">
                <div className="relative aspect-square w-[310px] max-w-full lg:w-[370px]">
                  {/* Orbital rings */}
                  <div className="absolute inset-[4%] rounded-full border border-dashed border-white/25" />
                  <div className="absolute inset-[17%] rounded-full border border-dashed border-white/25" />
                  <div className="absolute inset-[30%] rounded-full border border-dashed border-white/25" />
                  <div className="absolute inset-[42%] rounded-full border border-white/20" />

                  {/* Center emblem */}
                  <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md">
                    <Camera size={24} strokeWidth={1.4} />
                  </div>

                  {/* Orbiting profile markers */}
                  {orbitPeople.map((person, index) => (
                    <div
                      key={index}
                      className={`absolute ${person.position} z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 ${person.color} shadow-lg`}
                    >
                      <UserRound
                        size={19}
                        strokeWidth={1.6}
                        className="text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div
            id="contact"
            className="grid gap-8 py-10 sm:py-12 md:grid-cols-2 lg:grid-cols-[0.9fr_1.35fr_0.9fr] lg:gap-0 lg:py-16"
          >
            {contacts.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`min-w-0 ${index === 1
                      ? "lg:border-x lg:border-white/20 lg:px-10"
                      : index === 2
                        ? "lg:pl-10"
                        : "lg:pr-10"
                    }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40">
                      <Icon size={17} strokeWidth={1.6} />
                    </span>
                    <p className="text-[11px] font-semibold tracking-[0.24em] text-white/80">
                      {item.label}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm leading-6 text-white/75 sm:text-base">
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-5 border-t border-white/25 pt-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} Photography Studio. All rights reserved.
            </p>

            <a
              href="https://www.linkedin.com/in/ajay-rewapati-8a3011228/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 self-start transition hover:text-white sm:self-auto"
            >
              Designed &amp; Developed by
              <span className="ml-1 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 group-hover:decoration-white">
                ajax
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}