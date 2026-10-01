"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2, Upload, Video } from "lucide-react";
import { ApiRequestError, uploadMedia } from "@/lib/services/admin.service";
import type { FieldConfig } from "@/lib/adminConfig";

type Props = {
  field: FieldConfig;
  value: string;
  passcode: string;
  error?: string;
  onChange: (value: string) => void;
  /** Called with the URL of every file that was uploaded through this field. */
  onUploaded: (url: string) => void;
  onUnauthorized: () => void;
};

const isEmbed = (url: string) => /youtube\.com|youtu\.be|vimeo\.com/i.test(url);

export default function MediaField({ field, value, passcode, error, onChange, onUploaded, onUnauthorized }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");
  const isVideo = field.kind === "video";
  const uploading = progress !== null;


  async function handleFile(file: File) {
    setUploadError("");
    setProgress(0);
    try {
      const result = await uploadMedia(passcode, file, setProgress);
      onUploaded(result.url);
      onChange(result.url);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) return onUnauthorized();
      setUploadError(err instanceof Error ? err.message : "Upload failed. Try again.");
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const Icon = isVideo ? Video : ImagePlus;

  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-ink" htmlFor={`field-${field.name}`}>
        {field.label}
        {field.required && <span className="text-ember"> *</span>}
      </label>
      {field.help && <p className="mt-1 text-xs text-stone">{field.help}</p>}

      <div className="mt-2 flex gap-3">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-paper-dim text-stone">
          {value && !isVideo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : value && isVideo && !isEmbed(value) ? (
            <video src={value} muted preload="metadata" className="h-full w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-1 px-2 text-center text-[11px] leading-tight">
              <Icon size={18} strokeWidth={1.5} />
              {value ? "Linked video" : isVideo ? "No video" : "No image"}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <input
            id={`field-${field.name}`}
            type="text"
            inputMode="url"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={isVideo ? "Paste a link, or upload a file" : "Paste an image link, or upload a file"}
            className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/20"
          />

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm text-ink transition-colors hover:border-ink disabled:opacity-50"
            >
              <Upload size={15} />
              {uploading ? `Uploading ${progress}%` : "Upload file"}
            </button>
            {value && !uploading && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone transition-colors hover:text-ember"
              >
                <Trash2 size={15} />
                Remove
              </button>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={isVideo ? "video/mp4,video/webm,video/quicktime" : "image/jpeg,image/png,image/webp,image/gif,image/avif"}
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
          </div>

          {uploading && (
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={progress ?? 0} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-ember transition-[width]" style={{ width: `${progress}%` }} />
            </div>
          )}
          {(uploadError || error) && <p className="mt-2 text-xs text-ember">{uploadError || error}</p>}
          {!isVideo && value && !/^\/|backblazeb2\.com|images\.unsplash\.com|drive\.google\.com/i.test(value) && (
            <p className="mt-2 text-xs text-stone">
              Links from other sites may not display. Upload the file to be safe.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
