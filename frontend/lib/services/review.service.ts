import { API_URL } from "@/lib/api";
import type { ReviewPayload } from "@/lib/types";

export type { ReviewPayload } from "@/lib/types";

async function readError(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  return body?.error || fallback;
}

export async function uploadReviewImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch(`${API_URL}/api/reviews/upload`, { method: "POST", body: form });
  if (!response.ok) throw new Error(await readError(response, "Image upload failed."));
  const body = (await response.json()) as { url?: string };
  if (!body.url) throw new Error("Image upload failed.");
  return body.url;
}

export async function submitReview(payload: ReviewPayload) {
  const response = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await readError(response, "Review submission failed."));
  return response.json() as Promise<{ message: string }>;
}
