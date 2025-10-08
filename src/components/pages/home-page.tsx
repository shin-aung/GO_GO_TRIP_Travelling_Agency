"use client";

import { HeaderBackground } from "@/images";
import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import SocialButton from "../HomePageComponents/social-media-icon";

export default function HomePage() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const t = useTranslations("HomePage");

  return (
    <div
      className="relative pt-24 px-2 py-2 md:py-2 text-black"
      style={{
        backgroundImage: `url(${HeaderBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: "scaleY(-1)", // 👈 flips background upside down
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      <div
        style={{
          backgroundImage: `url(${HeaderBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-[70vh] lg:min-h-[95vh] rounded-3xl overflow-hidden scale-y-[-1]"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 rounded-3xl" />

        {/* Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col md:flex-row justify-between items-start p-8 min-h-[70vh] lg:min-h-[95vh]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start w-full mt-auto">
            {/* Left Section (Title & About) */}
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300 drop-shadow-lg">
                {t("title")}
              </h1>
              <p className="mt-6 text-lg md:text-2xl text-gray-200 font-light leading-relaxed">
                {t("about")}
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex space-x-6">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("packages")}
                  className="cursor-pointer px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg font-semibold transition"
                >
                  {t("explorePackages")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                  className="cursor-pointer px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-2xl shadow-lg font-semibold transition"
                >
                  {t("contactUs")}
                </motion.button>
              </div>
            </div>

            {/* Right Section (Social Icons) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex space-x-6 mt-8 md:mt-0 self-end"
            >
              <SocialButton
                href="https://www.tiktok.com"
                Icon={FaTiktok}
                label="TikTok"
                delay={0}
              />
              <SocialButton
                href="https://www.instagram.com"
                Icon={FaInstagram}
                label="Instagram"
                delay={0.3}
              />
              <SocialButton
                href="https://www.facebook.com"
                Icon={FaFacebook}
                label="Facebook"
                delay={0.6}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
