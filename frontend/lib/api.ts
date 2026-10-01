import type { SiteContent } from "@/lib/content";

/** Base URL of the backend, e.g. http://localhost:5000 (no trailing slash). */
export const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");

export class ApiRequestError extends Error {
  status: number;
  details?: Record<string, string>;

  constructor(message: string, status: number, details?: Record<string, string>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

async function readResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* not JSON */
  }
  if (!response.ok) {
    const body = (data ?? {}) as { error?: string; details?: Record<string, string> };
    throw new ApiRequestError(body.error || "Something went wrong. Try again.", response.status, body.details);
  }
  return data as T;
}

export async function fetchContent(): Promise<SiteContent> {
  const response = await fetch(`${API_URL}/api/content`, { cache: "no-store" });
  return readResponse<SiteContent>(response);
}

/** Calls an /api/admin route with the passcode header. `path` starts with "/admin". */
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
  return readResponse<T>(response);
}

export type UploadResult = { url: string; type: "image" | "video"; size: number };

/** Uploads to Backblaze B2 through the backend. Uses XHR so we can report progress. */
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
