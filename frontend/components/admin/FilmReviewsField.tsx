"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { ApiRequestError, uploadMedia } from "@/lib/services/admin.service";
import type { FieldConfig } from "@/lib/adminConfig";
import type { FilmReview } from "@/lib/content";

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

const emptyReview = (): FilmReview => ({ reviewer: "", relationship: "", quote: "", image: "" });

function parseReviews(value: string): FilmReview[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed as FilmReview[] : [];
  } catch {
    return [];
  }
}

export default function FilmReviewsField({
  field,
  value,
  passcode,
  error,
  onChange,
  onUploaded,
  onUploadingChange,
  onUnauthorized,
}: Props) {
  const reviews = useMemo(() => parseReviews(value), [value]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");

  function updateReview(index: number, changes: Partial<FilmReview>) {
    onChange(JSON.stringify(reviews.map((review, reviewIndex) => (
      reviewIndex === index ? { ...review, ...changes } : review
    ))));
  }

  async function uploadPhoto(index: number, file?: File) {
    if (!file) return;
    setUploadError("");
    setUploadingIndex(index);
    onUploadingChange(true);
    try {
      const result = await uploadMedia(passcode, file, () => {});
      onUploaded(result.url);
      updateReview(index, { image: result.url });
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) {
        onUnauthorized();
        return;
      }
      setUploadError(err instanceof Error ? err.message : "Could not upload the review photo.");
    } finally {
      setUploadingIndex(null);
      onUploadingChange(false);
    }
  }

  return (
    <fieldset className="col-span-2">
      <legend className="text-sm font-medium text-ink">{field.label}</legend>
      {field.help && <p className="mt-1 text-xs text-stone">{field.help}</p>}
      <div className="mt-3 space-y-4">
        {reviews.map((review, index) => (
          <section key={index} className="rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-ink">Review {index + 1}</h3>
              <button
                type="button"
                onClick={() => onChange(JSON.stringify(reviews.filter((_, reviewIndex) => reviewIndex !== index)))}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-ember-dim hover:bg-ember/5"
              >
                <Trash2 size={13} />
                Remove
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-medium text-ink">
                Reviewer name *
                <input
                  value={review.reviewer ?? ""}
                  onChange={(event) => updateReview(index, { reviewer: event.target.value })}
                  placeholder="Priya & Raghav"
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-ink"
                />
              </label>
              <label className="text-xs font-medium text-ink">
                Relationship
                <input
                  value={review.relationship ?? ""}
                  onChange={(event) => updateReview(index, { relationship: event.target.value })}
                  placeholder="Couple, bride’s mother..."
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-ink"
                />
              </label>
              <label className="text-xs font-medium text-ink sm:col-span-2">
                Review *
                <textarea
                  value={review.quote ?? ""}
                  rows={3}
                  onChange={(event) => updateReview(index, { quote: event.target.value })}
                  placeholder="Share their experience..."
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-ink"
                />
              </label>
              <label className="text-xs font-medium text-ink sm:col-span-2">
                Reviewer photo URL (optional)
                <input
                  type="url"
                  value={review.image ?? ""}
                  onChange={(event) => updateReview(index, { image: event.target.value })}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-ink"
                />
              </label>
              <div className="sm:col-span-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-sm text-ink hover:border-ink">
                  <Upload size={14} />
                  {uploadingIndex === index ? "Uploading…" : "Upload reviewer photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    disabled={uploadingIndex !== null}
                    className="hidden"
                    onChange={(event) => {
                      void uploadPhoto(index, event.target.files?.[0]);
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>
            </div>
          </section>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(JSON.stringify([...reviews, emptyReview()]))}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm text-ink transition hover:border-ink"
      >
        <Plus size={15} />
        Add reviewer
      </button>
      {(uploadError || error) && <p className="mt-2 text-xs text-ember">{uploadError || error}</p>}
    </fieldset>
  );
}
