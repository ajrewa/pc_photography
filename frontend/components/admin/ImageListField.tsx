"use client";

import { useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { ApiRequestError, uploadMedia } from "@/lib/services/admin.service";
import type { FieldConfig } from "@/lib/types";

type Props = {
  field: FieldConfig;
  value: string;
  passcode: string;
  error?: string;
  onChange: (value: string) => void;
  onUploaded: (url: string) => void;
  onUploadingChange: (uploading: boolean) => void;
  onUnauthorized: () => void;
};

export default function ImageListField({
  field,
  value,
  passcode,
  error,
  onChange,
  onUploaded,
  onUploadingChange,
  onUnauthorized,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploadError("");
    setUploading(true);
    onUploadingChange(true);
    const uploaded: string[] = [];
    try {
      for (let index = 0; index < files.length; index += 1) {
        const result = await uploadMedia(passcode, files[index], (fileProgress) => {
          setProgress(Math.round(((index + fileProgress / 100) / files.length) * 100));
        });
        onUploaded(result.url);
        uploaded.push(result.url);
      }
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) {
        onUnauthorized();
        return;
      }
      setUploadError(err instanceof Error ? err.message : "Upload failed. Try again.");
    } finally {
      if (uploaded.length) {
        onChange([...value.split(/\r?\n/).map((url) => url.trim()).filter(Boolean), ...uploaded].join("\n"));
      }
      setUploading(false);
      onUploadingChange(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="col-span-2">
      <label htmlFor={`field-${field.name}`} className="block text-sm font-medium text-ink">
        {field.label}
      </label>
      {field.help && <p className="mt-1 text-xs text-stone">{field.help}</p>}
      <textarea
        id={`field-${field.name}`}
        value={value}
        disabled={uploading}
        rows={Math.min(8, Math.max(3, value.split(/\r?\n/).filter(Boolean).length))}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://example.com/image-1.jpg"
        className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/20"
      />
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm text-ink transition-colors hover:border-ink disabled:opacity-50"
        >
          {uploading ? <Upload size={15} /> : <ImagePlus size={15} />}
          {uploading ? `Uploading ${progress}%` : "Upload images"}
        </button>
        <span className="text-xs text-stone">
          {value.split(/\r?\n/).filter((url) => url.trim()).length} image(s)
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(event) => void uploadFiles(event.target.files)}
        />
      </div>
      {uploading && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-ember transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      )}
      {(uploadError || error) && <p className="mt-2 text-xs text-ember">{uploadError || error}</p>}
    </div>
  );
}
