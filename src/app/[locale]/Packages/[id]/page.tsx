// app/[locale]/[packageName]/page.tsx

"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ArrowLeft, Clock, DollarSign, Star } from "lucide-react";

interface AboutPackageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function AboutPackage({ params }: AboutPackageProps) {
  const { id } = use(params);
  const u = useTranslations("UniversalWords");
  const router = useRouter();
  const [packageById, setPackageById] = useState<Package | null>(null);

  useEffect(() => {
    const fetchPackageById = async () => {
      const res = await fetch(`/api/packageById?id=${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch package by ID");
      }

      const data: Package = await res.json();
      setPackageById(data);
    };

    fetchPackageById();
  }, [id]);

  if (!packageById) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2
    bg-white/90 hover:bg-white
    text-gray-700 font-medium
    rounded-lg shadow-md
    transition-all duration-200
    hover:-translate-y-0.5 hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          {u("back")}
        </button>

        {/* Hero Section */}
        <div className="relative w-full h-64 md:h-96">
          <img
            src={`https://drive.google.com/thumbnail?id=${packageById.imageURL}`}
            alt="Header Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {packageById.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-10">
          {/* Description */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              {packageById.description}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" /> Highlights
            </h2>

            <ul className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 h-full w-px bg-green-300" />

              {packageById.details.map(
                (
                  {
                    place,
                    time,
                    description,
                  }: {
                    place: string;
                    time: string;
                    description: string;
                  },
                ) => (
                  <li key={`${place}-${time}`} className="relative pl-10 pb-8">
                    {/* Bullet */}
                    <span className="absolute left-1.5 top-1 w-3 h-3 bg-green-600 rounded-full" />

                    {/* Time */}
                    <p className="font-semibold text-green-700">{time}</p>

                    {/* Place */}
                    <p className="mt-1 text-gray-900 font-medium">{place}</p>

                    {/* Description */}
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                  </li>
                )
              )}
            </ul>
          </section>

          {/* Duration & Price */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t pt-6">
            <div className="flex items-center gap-3 text-gray-800 text-lg">
              <Clock className="w-6 h-6 text-blue-600" />
              {packageById.duration}
            </div>
            <div className="flex items-center gap-3 text-gray-900 text-xl font-semibold">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              {packageById.price}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
