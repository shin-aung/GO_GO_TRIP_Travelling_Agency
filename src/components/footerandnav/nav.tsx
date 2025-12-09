"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GOGOTRIPNoBgLogo } from "@/images";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import { motion, AnimatePresence } from "framer-motion"; // for animations
import { useTranslations } from "next-intl";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const nav = useTranslations("Nav");

  // Extract language from path
  const currentLang = pathname.includes("/my") ? "my" : "en";

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false); // close menu after click
    }
  };

  // Detect section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "packages", "countries", "contact"];
      let current = "home";

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sec;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Labels by language
  const navItems = [
    { id: "home", label: nav("home") },
    { id: "about", label: nav("aboutUs") },
    {
      id: "packages",
      label: nav("packages"),
    },
    {
      id: "countries",
      label: nav("countries"),
    },
    {
      id: "contact",
      label: nav("contact"),
    },
  ];

  // Language switcher
  const switchLanguage = (lang: "en" | "my") => {
    if (currentLang === lang) return;

    if (pathname.includes("/en")) {
      router.push(pathname.replace("/en", `/${lang}`));
    } else if (pathname.includes("/my")) {
      router.push(pathname.replace("/my", `/${lang}`));
    } else {
      router.push(`/website/${lang}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 mt-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img src={GOGOTRIPNoBgLogo.src} alt="GO GO TRIP" className="h-10" />
          <span className="font-extrabold text-xl tracking-wide text-white">
            GO GO TRIP
          </span>
        </div>

        {/* Desktop Nav (hidden until lg) */}
        <nav className="hidden lg:flex items-center space-x-6 font-semibold">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-white text-black shadow-md"
                  : "text-white hover:text-orange-300 hover:scale-105"
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* Language Switcher (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-2">
          <button
            onClick={() => switchLanguage("en")}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold transition ${
              currentLang === "en"
                ? "bg-white text-black shadow"
                : "text-white hover:text-orange-300"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => switchLanguage("my")}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold transition ${
              currentLang === "my"
                ? "bg-white text-black shadow"
                : "text-white hover:text-orange-300"
            }`}
          >
            MY
          </button>
        </div>

        {/* Hamburger Icon (mobile + iPad) */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:text-orange-500 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile/iPad Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center space-y-8 z-40 backdrop-blur-md"
          >
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer text-2xl font-bold ${
                  activeSection === item.id
                    ? "text-orange-400"
                    : "text-white hover:text-orange-400"
                }`}
              >
                {item.label}
              </div>
            ))}

            {/* Language Switcher (Mobile/iPad) */}
            <div className="flex space-x-6 pt-6">
              <button
                onClick={() => switchLanguage("en")}
                className={`px-4 py-2 rounded-full text-lg font-semibold transition ${
                  currentLang === "en"
                    ? "bg-white text-black shadow"
                    : "text-white hover:text-orange-300"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage("my")}
                className={`px-4 py-2 rounded-full text-lg font-semibold transition ${
                  currentLang === "my"
                    ? "bg-white text-black shadow"
                    : "text-white hover:text-orange-300"
                }`}
              >
                MY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
