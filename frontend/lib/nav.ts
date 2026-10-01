// import {
//   Heart,
//   Clapperboard,
//   UserRound,
//   Users,
//   GraduationCap,
//   Presentation,
//   Phone,
//   CircleHelp,
//   type LucideIcon,
// } from "lucide-react";

// export type NavItem = {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// };

// export const navItems: NavItem[] = [
//   { label: "Home", href: "/", icon: Heart },
//   { label: "Films", href: "/films", icon: Clapperboard },
//   { label: "About", href: "/about", icon: UserRound },
//   { label: "Crew", href: "/crew", icon: Users },
//   { label: "Workshop", href: "/workshop", icon: GraduationCap },
//   { label: "Blog & Press", href: "/blog", icon: Presentation },
//   { label: "Contact", href: "/contact", icon: Phone },
// ];

// export const faqItem: NavItem = { label: "FAQs", href: "/faqs", icon: CircleHelp };


import {
  Heart,
  Clapperboard,
  UserRound,
  Users,
  GraduationCap,
  Presentation,
  Phone,
  CircleHelp,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Heart },
  { label: "Films", href: "/films", icon: Clapperboard },
  { label: "About", href: "/about", icon: UserRound },
  { label: "Crew", href: "/crew", icon: Users },
  { label: "Workshop", href: "/workshop", icon: GraduationCap },
  { label: "Blog & Press", href: "/blog", icon: Presentation },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const faqItem: NavItem = { label: "FAQs", href: "/faqs", icon: CircleHelp };

export const adminItem: NavItem = { label: "Admin", href: "/admin", icon: ShieldCheck };
