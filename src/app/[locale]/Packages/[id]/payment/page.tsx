"use client";

import { Package } from "@/dataTypes/packages";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import AuthModal from "@/components/footerandnav/components/AuthModal";

interface PaymentProps {
  params: Promise<{ locale: string; id: string }>;
}

export default function Payment({ params }: PaymentProps) {
  const { id } = use(params);
  const u = useTranslations("UniversalWords");
  const router = useRouter();

  const [packageById, setPackageById] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth & UI state
  const [success, setSuccess] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state (demo only)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const fetchPackageById = async () => {
      const res = await fetch(`/api/packageById?id=${id}`);
      if (!res.ok) throw new Error("Failed to fetch package");
      const data: Package = await res.json();
      setPackageById(data);
    };

    const fetchUser = async () => {
      try {
        const encryptedUserID = localStorage.getItem("userId");
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

        if (!encryptedUserID || !secretKey) {
          setSuccess(false);
          return;
        }

        const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
        const userId = bytes.toString(CryptoJS.enc.Utf8);

        if (!userId) {
          setSuccess(false);
          return;
        }

        const res = await fetch(`/api/signin?id=${userId}`);
        setSuccess(res.ok);
      } catch (err) {
        console.error(err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchPackageById();
  }, [id]);

  const handleModalOpen = () => {
    if (!success) {
      setAuthOpen(true);
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const encryptedUserID = localStorage.getItem("userId");
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
      if (!encryptedUserID || !secretKey) return;

      const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
      const userId = bytes.toString(CryptoJS.enc.Utf8);

      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          packageId: id,
        }),
      });

      if (!res.ok) throw new Error("Payment failed");

      router.push("/success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  if (loading || !packageById) {
    return <div className="text-center mt-20 text-black">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-6 md:px-20 text-black">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 hover:text-gray-700"
      >
        <ArrowLeft size={20} />
        {u("back")}
      </button>

      {/* Hero */}
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mb-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://drive.google.com/thumbnail?id=${packageById.imageURL})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            {packageById.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <p>{packageById.description}</p>
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${packageById.price}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard />
            <h2 className="text-2xl font-bold">Card Details</h2>
          </div>

          <form className="space-y-4">
            <input
              placeholder="Cardholder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
              className="w-full border rounded-lg px-4 py-2"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength={5}
                className="border rounded-lg px-4 py-2"
              />
              <input
                placeholder="CVV"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={4}
                className="border rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="button"
              onClick={handleModalOpen}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Pay ${packageById.price}
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Purchase</h3>
            <p className="mb-6">
              Purchase this package for <strong>${packageById.price}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} route={`payment`} />
    </main>
  );
}
