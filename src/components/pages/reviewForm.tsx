"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

interface ReviewFormProps {
  onSuccess: () => void;
  packageId?: string;
}

export default function ReviewForm({ onSuccess, packageId }: ReviewFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const encryptedUserID = localStorage.getItem("userId");
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (!encryptedUserID || !secretKey) {
      setError("Please sign in to write a review.");
      return;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
    const userId = bytes.toString(CryptoJS.enc.Utf8);

    if (!userId) {
      setError("Please sign in to write a review.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: packageId || "",
          userId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess("Thank you! Your review has been submitted.");
      setRating(null);
      setComment("");

      onSuccess(); // 🔄 refresh reviews
    } catch (err) {
      setError((err as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Leave a Review
      </h2>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
          {success}
        </p>
      )}

      {/* Rating */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${
                rating && star <= rating
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          placeholder="Share your experience..."
          className="text-black w-full h-50 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
