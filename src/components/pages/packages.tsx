"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeaderBackground } from "@/images";
import PackageCard from "../PackagesComponents/packages-card";
import { useTranslations } from "next-intl";

export default function Packages() {
  const t = useTranslations("Packages.PackagesPage");

  return (
    <div className="relative py-24 px-6">
      {/* Background */}
      <Image
        src={HeaderBackground}
        alt="Packages background"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 -z-10" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          {t("description")}
        </p>
      </motion.div>

      {/* Packages Grid */}
      <PackageCard />
    </div>
  );
}
