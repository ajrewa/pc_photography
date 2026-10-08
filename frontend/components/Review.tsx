"use client";

import { FormEvent, useRef, useState } from "react";
import { Star, Upload } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchContent } from "@/lib/store/contentSlice";
import { setField, submitReviewThunk, uploadReviewImageThunk } from "@/lib/store/reviewSlice";

export default function ReviewSubmit() {
  const dispatch = useAppDispatch();
  const { author, quote, role, image, submitting, uploading, message, error } = useAppSelector((state) => state.review);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);

  const uploadImage = async (file: File) => {
    await dispatch(uploadReviewImageThunk(file));
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(submitReviewThunk({ author, image, quote, rating, role }));
    if (submitReviewThunk.fulfilled.match(result)) {
      setRating(0);
      void dispatch(fetchContent());
    }
  };

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full rounded-[24px] border border-black/10 bg-paper-dim/50 p-5 sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
            Share your experience
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Tell us about your experience
          </h2>
          <p className="mt-2 text-sm text-stone">
            Your feedback helps other couples choose their wedding film team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-ink">Your rating</legend>
            <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
                  onClick={() => setRating(star)}
                  className="rounded p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                >
                  <Star
                    size={28}
                    className={star <= rating ? "fill-ember text-ember" : "text-stone-light"}
                  />
                </button>
              ))}
              {rating > 0 && <span className="ml-2 text-sm text-stone">{rating} out of 5</span>}
            </div>
            {rating === 0 && <p className="mt-1 text-xs text-stone">Select a rating to submit your review.</p>}
          </fieldset>

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

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Photo (optional)
            </label>
            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => dispatch(setField({ field: "image", value: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
            />
            <p className="mt-1.5 text-xs text-stone">
              Add a photo URL or upload a wedding image.
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

          <div className="pt-1">
            <button
              type="submit"
              disabled={submitting || uploading || rating === 0}
              className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          {(message || error) && (
            <p className={`text-center text-sm ${error ? "text-ember" : "text-stone"}`}>{message || error}</p>
          )}
        </form>
      </div>
    </section>
  );
}