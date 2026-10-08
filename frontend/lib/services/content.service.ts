import type { SiteContent } from "@/lib/types";
import { API_URL } from "@/lib/api";

export async function getSiteContent(): Promise<SiteContent> {
  const response = await fetch(`${API_URL}/api/content`, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load site content.");
  return response.json() as Promise<SiteContent>;
}
