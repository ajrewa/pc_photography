# The Wedding Filmer — Next.js Rebuild

A full, component-based recreation of the reference site's look and structure:
black sidebar navigation with a red "Enquire" accent, a full-bleed hero
carousel, a slide-up mobile menu, and matching interior pages — built with
Next.js 14 (App Router), TypeScript, and Tailwind CSS, with Lenis for buttery
smooth scrolling.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

> Note: this project loads Playfair Display, Inter, Cormorant Garamond, and
> Marck Script via `next/font/google`, which fetches font files at build
> time. Make sure you build with an internet connection available (this is
> the default on Vercel and most local setups).

## Structure

```
app/
  layout.tsx          — fonts, nav, footer, smooth scroll wrapper
  page.tsx             — home page
  films/page.tsx        — films index
  films/[slug]/page.tsx — single film page
  about/page.tsx
  crew/page.tsx
  workshop/page.tsx
  blog/page.tsx
  contact/page.tsx
  faqs/page.tsx
components/
  MainNav.tsx          — desktop sidebar + mobile bottom bar + slide-up menu
  HeroCarousel.tsx      — home page hero slider
  FilmCard.tsx
  SectionHeading.tsx
  Footer.tsx
  Logo.tsx
  SmoothScroll.tsx      — Lenis smooth-scroll provider
lib/
  films.ts              — film/story data (swap in your real content + images)
  nav.ts                 — nav items + icons
```

## Customizing

- **Content & images**: edit `lib/films.ts`. Images currently point to
  Unsplash placeholders — swap in your own via `/public` or a CMS.
- **Colors & type**: all design tokens live in `tailwind.config.ts`
  (`ink`, `paper`, `ember`, `sand`, `stone` colors; `display`/`body`/`script`/
  `ital` font families).
- **Nav items**: edit `lib/nav.ts`.
- **Contact form**: `app/contact/page.tsx` is a static form — wire the
  `<form>` up to your email/CRM endpoint of choice (e.g. an API route,
  Formspree, or a serverless function).

## Notes

- Fully responsive: desktop shows a fixed left sidebar + top bar; mobile
  shows a floating bottom pill bar that opens a full-screen slide-up menu,
  matching the reference screenshots.
- Smooth scrolling is handled by [Lenis](https://github.com/darkroomengineering/lenis).
- Icons via [lucide-react](https://lucide.dev).
