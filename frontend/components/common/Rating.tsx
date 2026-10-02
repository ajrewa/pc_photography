"use client";

import { useState } from "react";
import { Star, X, Heart, MessageSquare } from "lucide-react";

type RatingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { rating: number; review: string }) => void;
};

export default function RatingModal() {
// export default function RatingModal({ isOpen, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // if (!isOpen) return null;
  if (true) return null;

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // if (rating === 0) return;

    // if (onSubmit) {
    //   onSubmit({ rating, review });
    // }
    // setIsSubmitted(true);
  };

  const resetAndClose = () => {
    // onClose();
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setReview("");
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b0b0a]/40 backdrop-blur-sm transition-opacity"
        onClick={resetAndClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#0b0b0a]/10 bg-[#f6f4ef] p-6 sm:p-8 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#0b0b0a]/10 bg-white text-[#0b0b0a]/60 transition-colors hover:bg-[#0b0b0a] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0b0b0a]/10 bg-white px-3.5 py-1 text-[10px] font-semibold tracking-[0.25em] text-[#0b0b0a]/70 uppercase shadow-sm">
                <Heart className="h-3 w-3 text-[#d8382c] fill-[#d8382c]" />
                Your Feedback
              </span>

              <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-normal text-[#0b0b0a]">
                Enjoying PC Photography?
              </h2>

              <p className="mt-1.5 text-xs text-[#0b0b0a]/70 font-normal leading-relaxed text-balance">
                Your thoughts help us continuously craft cinematic memories for couples around the world.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
              {/* Star Rating Interactive Bar */}
              <div className="flex items-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const activeStar = hoverRating || rating;
                  const isFilled = star <= activeStar;

                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-115 focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          isFilled
                            ? "fill-[#d8382c] text-[#d8382c]"
                            : "text-[#0b0b0a]/20 fill-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Rating Label Indicator */}
              <div className="mt-1 min-h-[20px]">
                {(hoverRating || rating) > 0 && (
                  <p className="text-[11px] font-semibold tracking-widest text-[#d8382c] uppercase">
                    {
                      ["Disappointing", "Needs Work", "Good Experience", "Great Work!", "Exceptional!"][
                        (hoverRating || rating) - 1
                      ]
                    }
                  </p>
                )}
              </div>

              {/* Review Text Area */}
              <div className="mt-5 w-full">
                <label className="mb-2 block text-center text-[10px] font-bold tracking-[0.2em] text-[#0b0b0a]/60 uppercase">
                  Redirect to Review Section
                </label>
                {/* <textarea
                  rows={3}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share details of your experience with our team..."
                  className="w-full rounded-2xl border border-[#0b0b0a]/10 bg-white p-3.5 text-xs text-[#0b0b0a] placeholder-[#0b0b0a]/40 shadow-sm transition-all focus:border-[#0b0b0a] focus:outline-none focus:ring-1 focus:ring-[#0b0b0a]"
                /> */}
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={rating === 0}
                className="mt-6 w-full rounded-full border border-[#0b0b0a] bg-[#0b0b0a] py-3 text-xs font-semibold tracking-widest text-[#f6f4ef] uppercase transition-all duration-300 hover:bg-[#d8382c] hover:border-[#d8382c] disabled:opacity-40 disabled:hover:bg-[#0b0b0a] disabled:hover:border-[#0b0b0a]"
              >
                Go For Review
              </button>
            </form>
          </div>
        ) : (
          /* Thank You Success View */
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d8382c]/10 text-[#d8382c]">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-serif text-2xl font-normal text-[#0b0b0a]">
              Thank You!
            </h3>

            <p className="mt-2 text-xs text-[#0b0b0a]/70 text-balance">
              Your feedback means the world to us and helps us elevate our visual stories.
            </p>

            <button
              type="button"
              onClick={resetAndClose}
              className="mt-6 inline-flex rounded-full border border-[#0b0b0a]/20 bg-white px-8 py-2.5 text-xs font-semibold tracking-widest text-[#0b0b0a] uppercase transition-all hover:bg-[#0b0b0a] hover:text-[#f6f4ef]"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}