"use client";

import Link from "next/link";


const rotateSunKeyframes = `
  @keyframes rotateSun {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-5 z-50">
      <div className="flex items-start justify-between">
        {/* LEFT WHITE CURVED LOGO AREA */}
        <Link
          href="/"
          className="
            relative
            flex
            h-[120px]
            w-[380px]
            items-center
            bg-[#f6f4ef]
            px-8
            pb-2
            rounded-br-[45px]
            rounded-bl-[0px]
            rounded-tr-[0px]
            rounded-tl-[0px]
          "
        >
          {/* <div className="mt-7 flex items-end gap-3">
            <img src="/pc_logo_dark.png" alt="" className="h-20 w-30" />
            <span className="text-[20px] font-semibold text-black">
              PHOTOGRAPHY
            </span>
          </div> */}


      {/* Injecting the keyframe styles */}
      <style>{rotateSunKeyframes}</style>

      {/* Main Container - Positions kept exactly as in original request */}
      <div className="mt-7 flex items-end gap-3 relative">
        
        {/* Existing Icon - Positioning Unchanged */}
        <img 
          src="/pc_logo_dark.png" 
          alt="PC Logo" 
          className="h-20 w-30 object-contain z-10" 
        />
        
        {/* Existing Text - Positioning Unchanged */}
        <span className="text-[20px] font-semibold text-black tracking-wider z-10">
          PHOTOGRAPHY
        </span>

        {/* --- New Graphic Elements --- */}
        {/* This container positions the new graphics absolute relative to the existing elements. */}
        <div className="absolute top-[-40px] left-[130px] flex items-end gap-1 pointer-events-none opacity-80">
          
          {/* Static Mountain Vector Icon */}
          {/* Using a simple 3-peak mountain SVG */}
          <svg 
            viewBox="0 0 100 60" 
            className="h-10 w-16 text-black"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <path d="M10 50 L35 15 L50 35 L65 20 L90 50 Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 40 L35 30 L45 40" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          </svg>

          {/* Rotating Sun Vector Icon */}
          <div className="relative">
            <svg 
              viewBox="0 0 100 100" 
              className="h-8 w-8 text-black"
              // Applying the animation style inline
              style={{ animation: 'rotateSun 15s linear infinite' }}
              fill="currentColor"
            >
              {/* Sun Core */}
              <circle cx="50" cy="50" r="20"/>
              {/* Simple stylized rays */}
              <path d="M50 10 L50 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M50 75 L50 90" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M10 50 L25 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M75 50 L90 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M22 22 L33 33" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M67 67 L78 78" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M22 78 L33 67" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M67 33 L78 22" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

        </Link>

        {/* RIGHT WHITE CURVED NAVIGATION */}
        <nav
          className="
            mr-[4%]
            mt-[18px]
            hidden
            h-[76px]
            items-center
            rounded-full
            bg-[#f6f4ef]
            px-10
            shadow-sm
            lg:flex
          "
        >
          <div className="flex items-center gap-10">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#principles">Our Principles</NavLink>
            <NavLink href="#community">Community</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            <a
              href="#"
              aria-label="Instagram"
              className="ml-1 transition-transform hover:scale-110"
            >
              <InstagramIcon />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="transition-transform hover:scale-110"
            >
              <FacebookIcon />
            </a>
          </div>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="
            mr-5
            mt-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-white
            lg:hidden
          "
          aria-label="Open menu"
        >
          <div className="flex w-6 flex-col gap-1.5">
            <span className="h-0.5 w-full bg-black" />
            <span className="h-0.5 w-full bg-black" />
            <span className="h-0.5 w-full bg-black" />
          </div>
        </button>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        whitespace-nowrap
        text-[17px]
        font-medium
        text-black
        transition-opacity
        hover:opacity-50
      "
    >
      {children}
    </Link>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}
