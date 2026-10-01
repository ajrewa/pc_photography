"use client";

import { FormEvent, useRef } from "react";
import { Upload } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setField, submitReviewThunk, uploadReviewImageThunk } from "@/lib/store/reviewSlice";

export default function ReviewSubmit() {
  const dispatch = useAppDispatch();
  const { author, quote, role, order, image, submitting, uploading, message, error } = useAppSelector((state) => state.review);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    await dispatch(uploadReviewImageThunk(file));
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(submitReviewThunk({ author, image, order, quote, role }));
  };

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-[24px] border border-black/10 bg-paper-dim/50 p-5 sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
            Share your experience
          </p>

          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Leave us a note
          </h2>

          <p className="mt-2 text-sm text-stone">
            We would love to hear about your experience with us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Author + Role */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Your name
              </label>

              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => dispatch(setField({ field: "author", value: e.target.value }))}
                placeholder="e.g. Sarah & David"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-ink"
              >
                You are
              </label>

              <select
                id="role"
                value={role}
                onChange={(e) => dispatch(setField({ field: "role", value: e.target.value }))}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
              >
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
                <option value="couple">Couple</option>
                <option value="family">Family</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Quote */}
          <div>
            <label
              htmlFor="quote"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Your review
            </label>

            <textarea
              id="quote"
              value={quote}
              onChange={(e) => dispatch(setField({ field: "quote", value: e.target.value }))}
              placeholder="Tell us about your experience..."
              rows={4}
              required
              className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
            />
          </div>

          {/* Image + Order */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Image URL
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(e) => dispatch(setField({ field: "image", value: e.target.value }))}
                placeholder="https://..."
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
              />

              <p className="mt-1.5 text-xs text-stone">
                Add a URL or upload your wedding image.
              </p>
              <button
                type="button"
                disabled={uploading}
                onClick={() => imageInputRef.current?.click()}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium text-ink transition hover:border-ink disabled:opacity-50"
              >
                <Upload size={14} />
                {uploading ? "Uploading..." : "Upload image"}
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void uploadImage(file);
                }}
              />
            </div>

            {/* Order */}
            <div>
              <label
                htmlFor="order"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Order
              </label>

              <input
                id="order"
                type="text"
                value={order}
                onChange={(e) => dispatch(setField({ field: "order", value: e.target.value }))}
                placeholder="Optional"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          {/* Message */}
          {(message || error) && (
            <p className={`text-center text-sm ${error ? "text-ember" : "text-stone"}`}>{message || error}</p>
          )}
        </form>
      </div>
    </section>
  );
}