"use client";

import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import { HeaderBackground } from "@/images";

export default function AboutUsPage() {
  const AboutUsData = useTranslations("AboutUsPage");

  return (
    <div className="relative py-24 px-4 sm:px-6 md:px-6 lg:px-6 text-black">
      {/* Background */}
      <Image
        src={HeaderBackground}
        alt="About Us background"
        fill
        className="object-cover -z-10"
        priority
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm -z-10" />

      {/* Inner Container for consistent margins */}
      
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black drop-shadow-lg">
            {AboutUsData("title")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            {AboutUsData("subtitle")}
          </p>
        </div>

        {/* Grid 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden">
            <Image
              src={HeaderBackground}
              alt="Header Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center px-2 md:px-0">
            <h2 className="text-2xl font-semibold mb-4">
              {AboutUsData("contentOne.title")}
            </h2>
            <p className="text-gray-700">{AboutUsData("contentOne.description")}</p>
          </div>
        </div>

        {/* Grid 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center px-2 md:px-0 order-2 md:order-1">
            <h2 className="text-2xl font-semibold mb-4">
              {AboutUsData("contentTwo.title")}
            </h2>
            <p className="text-gray-700">{AboutUsData("contentTwo.description")}</p>
          </div>
          <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src={HeaderBackground}
              alt="Header Background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
