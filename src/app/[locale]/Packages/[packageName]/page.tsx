// app/[locale]/[packageName]/page.tsx

"use client";

import { HeaderBackground } from "@/images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";
import { ArrowLeft, CheckCircle, Clock, DollarSign, Star } from "lucide-react";

interface AboutPackageProps {
  params: Promise<{
    locale: string;
    packageName: string;
  }>;
}

export default function AboutPackage({ params }: AboutPackageProps) {

  const { packageName } = use(params);

  const t = useTranslations(`Packages.${packageName}`);
  const u = useTranslations('UniversalWords')
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-700 font-medium rounded-lg shadow-md transition"
        >
          <ArrowLeft className="w-5 h-5" />
          {u('back')}
        </button>

        {/* Hero Section */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={HeaderBackground.src}
            alt="Header Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {t("title")}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-10">
          {/* Description */}
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t("description")}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" /> Highlights
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.raw("highlights").map((item: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Includes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" /> What’s Included
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.raw("includes").map((item: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Duration & Price */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t pt-6">
            <div className="flex items-center gap-3 text-gray-800 text-lg">
              <Clock className="w-6 h-6 text-blue-600" />
              <span>{t("duration")}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-900 text-xl font-semibold">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              <span>{t("price")}</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
