"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GOGOTRIPNoBgLogo } from "@/images";
import AuthModal from "./components/AuthModal";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import { motion, AnimatePresence } from "framer-motion"; // for animations
import { useTranslations } from "next-intl";
import CryptoJS from "crypto-js";
import { User } from "@/dataTypes/user";

export default function Nav() {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const nav = useTranslations("Nav");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // start as loading

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

  useEffect(() => {
    const fetchUser = async () => {
      const encryptedUserID = localStorage.getItem("userId");
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

      if (!encryptedUserID || !secretKey) {
        setLoading(false); // stop loading if no userId
        return;
      }

      try {
        // Decrypt the userId before sending to your API
        const bytes = CryptoJS.AES.decrypt(encryptedUserID, secretKey);
        const userId = bytes.toString(CryptoJS.enc.Utf8);

        if (userId) {
          const queryParams = new URLSearchParams({ id: userId }).toString();
          const res = await fetch(`/api/signin?${queryParams}`);
          const data = await res.json();

          if (data) {
            setUser(data);
            setSuccess(true);
          } else {
            setSuccess(false);
          }
        }
      } catch (err) {
        console.error(err);
        setSuccess(false);
      } finally {
        setLoading(false); // stop loading in all cases
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 mt-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <div
            className="h-10 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${GOGOTRIPNoBgLogo.src})`,
            }}
            aria-label="GO GO TRIP"
          />
          <span className="font-extrabold text-xl tracking-wide text-white">
            TRIP ZONE
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
        {loading ? (
          // Loading indicator for just this part
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        ) : success && user ? (
          // User avatar
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          // Sign In / Register button
          <button
            onClick={() => setAuthOpen(true)}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-orange-200 transition"
          >
            Sign In / Register
          </button>
        )}

        {/* <div className="hidden lg:flex items-center space-x-2">
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
        </div> */}

        {/* Hamburger Icon (mobile + iPad) */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:text-orange-500 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
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
