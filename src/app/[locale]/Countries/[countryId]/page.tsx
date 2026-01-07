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

  // Fetch packages for the country
  useEffect(() => {
    const fetchPackagesByCountry = async () => {
      const res = await fetch(`/api/packagesByCountry?countryId=${countryId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch packages by country");
      }

      const data: Package[] = await res.json();
      setCountryPackages(data);
    };

    fetchPackagesByCountry();
  }, [countryId]);

  const CountryPackages = dataCountryPackages.map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    subsTitle: pkg.subtitle,
    price: pkg.price,
    imageURL: pkg.imageURL,
  }));

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
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
      {CountryPackages.map((pkg, index) => (
        <motion.article
          key={pkg.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="relative flex flex-col bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition"
        >
          {/* Image Section */}
          <div className="relative h-56 w-full overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(https://drive.google.com/thumbnail?id=${pkg.imageURL})`,
              }}
              aria-label={pkg.title}
            />
            <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1.5 rounded-xl shadow-md text-sm font-semibold">
              {pkg.price}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 text-left">
            <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow mb-2">
              {pkg.title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4">
              {pkg.subsTitle}
            </p>
            {/* Button */}
            <div className="mt-auto">
              <button
                onClick={() => router.push(`/Packages/${pkg.id}`)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-white text-black font-medium shadow-md 
               transition duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400 hover:text-white hover:scale-105 hover:shadow-lg"
              >
                Read More
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
