"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeaderBackground } from "@/images";
import { useTranslations } from "next-intl";

// Create a map from image key to actual import
const imageMap: Record<string, any> = {
  HeaderBackground,
  // Add more images if needed
};

export default function Countries() {
  const t = useTranslations("Countries.CountriesPage");

  const countries = t.raw("items") as Array<{
    title: string;
    desc: string;
    image: string;
  }>;

  return (
    <div className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <Image
        src={HeaderBackground}
        alt="Trip background"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm -z-10" />

      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black drop-shadow">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Infinite Scrolling Cards */}
      <div className="mt-16 relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {[...countries, ...countries].map((country, index) => (
            <div
              key={index}
              className="group relative w-72 h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <Image
                src={imageMap[country.image]}
                alt={country.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                  {country.title}
                </h2>
                <p className="text-white opacity-0 group-hover:opacity-100 mt-4 text-base md:text-lg transition-opacity duration-500 max-w-sm">
                  {country.desc}
                </p>

                {/* See More button - only on hover */}
                <Link
                  href={`/Countries/${encodeURIComponent(country.title)}`}
                  className="mt-6 inline-block bg-white text-black font-semibold px-4 py-2 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  See More
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
