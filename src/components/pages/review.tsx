"use client";

import Image from "next/image";
import HeaderBackground from "@/images/background/headerBackground.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReviewForm from "./reviewForm";
import { Review } from "@/dataTypes/review";

interface ReviewsSectionProps {
  packageId?: string;
}

export default function ReviewsSection({ packageId }: ReviewsSectionProps) {
  const [allReviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/review");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const reviews = useMemo(() => {
    if (packageId) {
      return allReviews.filter((r) => r.packageId === packageId);
    } else {
      return allReviews.filter((r) => !r.packageId || r.packageId === "");
    }
  }, [allReviews, packageId]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [reviews]);

  return (
    <section className="relative py-16 px-4">
      {/* Background Image */}
      <Image
        src={HeaderBackground}
        alt="Review background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 -z-10" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* LEFT: Reviews */}
          <div className="text-white">
            <h2 className="text-2xl font-semibold">Reviews</h2>

            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={Number(averageRating)} />
              <span className="text-sm text-gray-200">
                {averageRating} ({reviews.length} reviews)
              </span>
            </div>

            <div className="mt-4 max-h-[420px] space-y-4 overflow-y-auto pr-2">
              {loading && <p className="text-gray-300">Loading reviews...</p>}

              {!loading && reviews.length === 0 && (
                <p className="text-gray-300">No reviews yet.</p>
              )}

              {sortedReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl bg-white/95 p-4 text-gray-800 shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <p className="font-medium">{review.userName}</p>
                    <StarRating rating={review.rating} />
                  </div>

                  <p className="mt-2 text-sm">{review.comment}</p>

                  {review.date && (
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Review Form */}
          <ReviewForm onSuccess={fetchReviews} packageId={packageId} />
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
