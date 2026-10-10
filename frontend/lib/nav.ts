import {
  Clapperboard,
  UserRound,
  Users,
  Phone,
  CircleHelp,
  ShieldCheck,
  Star,
  CalendarDays,
  type LucideIcon,
  Home,
} from "lucide-react";
import type { NavItem } from "@/lib/types";

export type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Films", href: "/films", icon: Clapperboard },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "About", href: "/about", icon: UserRound },
  { label: "Crew", href: "/crew", icon: Users },
  { label: "Availability", href: "/availability", icon: CalendarDays },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const faqItem: NavItem = { label: "FAQs", href: "/faqs", icon: CircleHelp };

export const adminItem: NavItem = { label: "Admin", href: "/admin", icon: ShieldCheck };
