"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />

        <h1 className="text-2xl font-bold mt-4 text-black">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment has been recorded
          successfully.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Home
          </button>

          {/* <button
            onClick={() => router.push("/orders")}
            className="w-full bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            View My Orders
          </button> */}
        </div>
      </div>
    </main>
  );
}
