"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { adminRequest, ApiRequestError } from "@/lib/services/admin.service";
import type { AdminItem, SectionConfig } from "@/lib/adminConfig";
import MediaField from "./MediaField";
import ImageListField from "./ImageListField";
import FilmReviewsField from "./FilmReviewsField";
import type { FilmReview } from "@/lib/content";

type Props = {
  section: SectionConfig;
  item?: AdminItem;
  categories: string[];
  passcode: string;
  onSaved: (message: string) => void;
  onCancel: () => void;
  onUnauthorized: () => void;
};

const inputClass =
  "mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-ink focus-visible:ring-2 focus-visible:ring-ink/20";

function parseFilmReviews(value: string): FilmReview[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed as FilmReview[] : [];
  } catch {
    return [];
  }
}

export default function ItemForm({ section, item, categories, passcode, onSaved, onCancel, onUnauthorized }: Props) {
  const editing = Boolean(item);


  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      section.fields.map((field) => {
        const current = item?.[field.name];
        if (field.kind === "image-list" && Array.isArray(current)) {
          return [field.name, current.join("\n")];
        }
        if (field.kind === "film-reviews" && Array.isArray(current)) {
          return [field.name, JSON.stringify(current)];
        }
        return [field.name, current === undefined || current === null ? "" : String(current)];
      })
    )
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const pending = useRef<Set<string>>(new Set());

  function discard(url: string) {
    if (!pending.current.delete(url)) return;
    adminRequest(passcode, "/admin/upload", { method: "DELETE", body: { url } }).catch(() => {});
  }

  function setValue(name: string, next: string) {
    const previous = values[name];
    const field = section.fields.find((entry) => entry.name === name);
    if (field?.kind === "image-list") {
      const nextUrls = new Set(next.split(/\r?\n/).map((url) => url.trim()).filter(Boolean));
      previous.split(/\r?\n/).map((url) => url.trim()).filter(Boolean).forEach((url) => {
        if (!nextUrls.has(url)) discard(url);
      });
    } else if (field?.kind === "film-reviews") {
      const nextReviewImages = new Set(parseFilmReviews(next).map((review) => review.image).filter(Boolean));
      parseFilmReviews(previous).map((review) => review.image).filter((url): url is string => Boolean(url)).forEach((url) => {
        if (!nextReviewImages.has(url)) discard(url);
      });
    } else if (previous && previous !== next) {
      discard(previous);
    }
    setValues((prev) => ({ ...prev, [name]: next }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function cancel() {
    pending.current.forEach(discard);
    onCancel();
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") cancel();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setFormError("");
    setErrors({});
    try {
      const path = editing ? `/admin/${section.key}/${item!._id}` : `/admin/${section.key}`;
      const body = Object.fromEntries(
        section.fields.map((field) => [
          field.name,
          field.kind === "image-list"
            ? values[field.name].split(/\r?\n/).map((url) => url.trim()).filter(Boolean)
            : field.kind === "film-reviews"
              ? parseFilmReviews(values[field.name])
            : values[field.name],
        ])
      );
      await adminRequest(passcode, path, { method: editing ? "PUT" : "POST", body });
      pending.current.clear(); // saved: these files are now in use
      onSaved(editing ? "Changes saved." : `${section.singular[0].toUpperCase()}${section.singular.slice(1)} added.`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.status === 401) return onUnauthorized();
        setFormError(err.message);
        setErrors(err.details ?? {});
      } else {
        setFormError("Could not reach the server. Check your connection and try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={cancel} aria-hidden />
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-form-title"
        className="relative flex h-full w-full max-w-xl flex-col bg-paper shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <h2 id="item-form-title" className="font-display text-2xl">
            {editing ? `Edit ${section.singular}` : `Add ${section.singular}`}
          </h2>
          <button type="button" onClick={cancel} aria-label="Close" className="rounded-full p-2 text-stone transition-colors hover:bg-black/5 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {formError && (
            <p role="alert" className="mb-5 rounded-lg border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember-dim">
              {formError}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {section.fields.map((field, index) => {
              const value = values[field.name] ?? "";
              const error = errors[field.name];

              if (field.kind === "image-list") {
                return (
                  <ImageListField
                    key={field.name}
                    field={field}
                    value={value}
                    passcode={passcode}
                    error={error}
                    onChange={(next) => setValue(field.name, next)}
                    onUploaded={(url) => pending.current.add(url)}
                    onUploadingChange={setUploadingImages}
                    onUnauthorized={onUnauthorized}
                  />
                );
              }

              if (field.kind === "film-reviews") {
                return (
                  <FilmReviewsField
                    key={field.name}
                    field={field}
                    value={value}
                    passcode={passcode}
                    error={error}
                    onChange={(next) => setValue(field.name, next)}
                    onUploaded={(url) => pending.current.add(url)}
                    onUploadingChange={setUploadingImages}
                    onUnauthorized={onUnauthorized}
                  />
                );
              }

              if (field.kind === "image" || field.kind === "video") {
                return (
                  <MediaField
                    key={field.name}
                    field={field}
                    value={value}
                    passcode={passcode}
                    error={error}
                    onChange={(next) => setValue(field.name, next)}
                    onUploaded={(url) => pending.current.add(url)}
                    onUnauthorized={onUnauthorized}
                  />
                );
              }

              return (
                <div key={field.name} className={field.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
                  <label className="block text-sm font-medium text-ink" htmlFor={`field-${field.name}`}>
                    {field.label}
                    {field.required && <span className="text-ember"> *</span>}
                  </label>
                  {field.kind === "textarea" ? (
                    <textarea
                      id={`field-${field.name}`}
                      value={value}
                      required={field.required}
                      rows={4}
                      autoFocus={index === 0}
                      placeholder={field.placeholder}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <input
                      id={`field-${field.name}`}
                      type={field.kind === "number" ? "number" : "text"}
                      step={field.kind === "number" ? "any" : undefined}
                      value={value}
                      required={field.required}
                      autoFocus={index === 0}
                      placeholder={field.placeholder}
                      list={field.suggestCategories ? "category-options" : undefined}
                      onChange={(event) => setValue(field.name, event.target.value)}
                      className={inputClass}
                    />
                  )}
                  {field.help && !error && <p className="mt-1 text-xs text-stone">{field.help}</p>}
                  {error && <p className="mt-1 text-xs text-ember">{error}</p>}
                </div>
              );
            })}
          </div>

          <datalist id="category-options">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-black/10 bg-paper px-6 py-4">
          <button type="button" onClick={cancel} className="rounded-full px-5 py-2.5 text-sm text-stone transition-colors hover:text-ink">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploadingImages}
            className="rounded-full bg-ember px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ember-dim disabled:opacity-60"
          >
            {saving ? "Saving…" : uploadingImages ? "Uploading images…" : editing ? "Save changes" : `Add ${section.singular}`}
          </button>
        </div>
      </form>
    </div>
  );
}
