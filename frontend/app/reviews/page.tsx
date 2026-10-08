"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useEffect } from "react";
import ReviewSubmit from "@/components/Review";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchContent } from "@/lib/store/contentSlice";

export default function ReviewsPage() {
  const dispatch = useAppDispatch();
  const { data: content, loading, error } = useAppSelector((state) => state.content);

  useEffect(() => {
    if (!content) void dispatch(fetchContent());
  }, [content, dispatch]);

  const reviews = content?.gratitude ?? [];
  const ratedReviews = reviews.filter((review) => typeof review.rating === "number");
  const average = ratedReviews.length
    ? ratedReviews.reduce((total, review) => total + (review.rating ?? 0), 0) / ratedReviews.length
    : 0;

  return (
    <main className="min-h-screen bg-paper px-5 pb-20 pt-12 text-ink sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone transition hover:text-ink">
          <ArrowLeft size={14} />
          Home
        </Link>
        <header className="mx-auto max-w-2xl py-12 text-center sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone">Couples share their stories</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Reviews &amp; ratings</h1>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Read about couples’ experiences and share your own.
          </p>
          {ratedReviews.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5">
              <span className="font-display text-xl">{average.toFixed(1)}</span>
              <span className="flex" aria-label={`${average.toFixed(1)} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} className={i < Math.round(average) ? "fill-ember text-ember" : "text-stone-light"} aria-hidden="true" />
                ))}
              </span>
              <span className="text-xs text-stone">from {ratedReviews.length} rating{ratedReviews.length === 1 ? "" : "s"}</span>
            </div>
          )}
        </header>

        <ReviewSubmit />

        <section className="mt-16" aria-labelledby="reviews-list-heading">
          <div className="mb-7 flex items-end justify-between border-b border-black/10 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone">What couples say</p>
              <h2 id="reviews-list-heading" className="mt-1 font-display text-3xl">Guest reviews</h2>
            </div>
            {!loading && <span className="text-xs text-stone">{reviews.length} review{reviews.length === 1 ? "" : "s"}</span>}
          </div>

          {loading && !content ? (
            <p className="py-10 text-center text-sm text-stone">Loading reviews…</p>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-ember/20 bg-ember/5 px-5 py-6 text-center text-sm text-stone">
              <p>We couldn’t load reviews right now.</p>
              <button type="button" onClick={() => void dispatch(fetchContent())} className="mt-2 underline underline-offset-4">
                Try again
              </button>
            </div>
          ) : reviews.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-black/15 px-5 py-12 text-center text-sm text-stone">
              No reviews yet. Be the first to share your experience.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review, index) => (
                <article key={review.id ?? `${review.author}-${index}`} className="rounded-2xl border border-black/10 bg-white p-6">
                  {typeof review.rating === "number" && (
                    <div className="mb-4 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={15} className={i < (review.rating ?? 0) ? "fill-ember text-ember" : "text-stone-light"} aria-hidden="true" />
                      ))}
                    </div>
                  )}
                  <p className="font-ital text-lg italic leading-relaxed text-ink">“{review.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    {review.image && (
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-paper-dim">
                        <Image src={review.image} alt="" fill sizes="44px" className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{review.author}</p>
                      <p className="mt-0.5 text-xs capitalize text-stone">{review.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
