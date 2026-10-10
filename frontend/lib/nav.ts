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
  Star,
} from "lucide-react";
import type { NavItem } from "@/lib/types";

export type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Heart },
  { label: "Films", href: "/films", icon: Clapperboard },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "About", href: "/about", icon: UserRound },
  { label: "Crew", href: "/crew", icon: Users },
  // { label: "Workshop", href: "/workshop", icon: GraduationCap },
  // { label: "Blog & Press", href: "/blog", icon: Presentation },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const faqItem: NavItem = { label: "FAQs", href: "/faqs", icon: CircleHelp };

export const adminItem: NavItem = { label: "Admin", href: "/admin", icon: ShieldCheck };
