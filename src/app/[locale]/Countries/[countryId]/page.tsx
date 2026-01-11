"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Package } from "@/dataTypes/packages";

interface AboutCountryProps {
  params: Promise<{
    locale: string;
    countryId: string;
  }>;
}

export default function AboutCountry({ params }: AboutCountryProps) {
  const router = useRouter();
  const u = useTranslations("UniversalWords");
  const { countryId } = use(params);
  const [dataCountryPackages, setCountryPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackagesByCountry = async () => {
      const res = await fetch(`/api/packagesByCountry?countryId=${countryId}`);
      if (!res.ok) throw new Error("Failed to fetch packages");
      setCountryPackages(await res.json());
    };
    fetchPackagesByCountry();
  }, [countryId]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-30 flex items-center gap-2 px-4 py-2
        bg-white/90 backdrop-blur-md text-gray-800 font-medium
        rounded-xl shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <ArrowLeft className="w-5 h-5" />
        {u("back")}
      </button>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {dataCountryPackages.map((pkg, index) => (
          <motion.article
            key={pkg.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative flex flex-col overflow-hidden
            rounded-3xl border border-white/20
            bg-white/10 backdrop-blur-xl
            shadow-lg hover:shadow-2xl transition-all"
          >
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center
                transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(https://drive.google.com/thumbnail?id=${pkg.imageURL})`,
                }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Price */}
              <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-semibold text-white
              rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg backdrop-blur-md">
                {pkg.price}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">
                {pkg.title}
              </h2>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                {pkg.subtitle}
              </p>

              <div className="mt-auto">
                <button
                  onClick={() => router.push(`/Packages/${pkg.id}`)}
                  className="inline-flex items-center justify-center
                  px-5 py-2.5 rounded-xl font-medium
                  bg-white text-black shadow-md
                  transition-all duration-300
                  hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400
                  hover:text-white hover:scale-105 hover:shadow-xl"
                >
                  Read More →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
