import { API_URL, ApiRequestError } from "@/lib/api";
import type { UploadResult } from "@/lib/types";

export { ApiRequestError };
export type { UploadResult } from "@/lib/types";

export async function adminRequest<T>(
  passcode: string,
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const response = await fetch(`${API_URL}/api${path}`, {
    method: options.method ?? "GET",
    headers: {
      "x-admin-passcode": passcode,
      ...(options.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const body = (data ?? {}) as { error?: string; details?: Record<string, string> };
    throw new ApiRequestError(body.error || "Something went wrong. Try again.", response.status, body.details);
  }
  return data as T;
}

export function uploadMedia(
  passcode: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/api/admin/upload`);
    xhr.setRequestHeader("x-admin-passcode", passcode);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onerror = () => reject(new ApiRequestError("Could not reach the server. Check your connection.", 0));
    xhr.onload = () => {
      let body: { error?: string } & Partial<UploadResult> = {};
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        /* not JSON */
      }
      if (xhr.status >= 200 && xhr.status < 300 && body.url) resolve(body as UploadResult);
      else reject(new ApiRequestError(body.error || "Upload failed. Try again.", xhr.status));
    };
    xhr.send(form);
  });
}
