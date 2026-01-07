import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Package } from "@/dataTypes/packages";

export default function PackageCard() {
  const router = useRouter();
  const [dataPackages, setPackages] = useState<Package[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      const res = await fetch("/api/packages");

      if (!res.ok) throw new Error("Failed to fetch packages");

      const data: Package[] = await res.json();
      setPackages(data);
    };

    fetchPackages();
  }, []);

  const visiblePackages = dataPackages.slice(currentIndex, currentIndex + 3);

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 3 >= dataPackages.length ? prev : prev + 3
    );
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? 0 : prev - 3));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    onTouchEndOrOnMouseUp: () => {},
    trackMouse: true,
  });

  return (
    <div className="mt-16 max-w-6xl mx-auto relative" {...handlers}>
      {/* Left Arrow */}
      <button
        onClick={prev}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 rounded-full p-3 transition 
    ${
      currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/60"
    }`}
      >
        ◀
      </button>

      <button
        onClick={next}
        disabled={currentIndex + 3 >= dataPackages.length}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 rounded-full p-3 transition 
    ${
      currentIndex + 3 >= dataPackages.length
        ? "opacity-30 cursor-not-allowed"
        : "hover:bg-white/60"
    }`}
      >
        ▶
      </button>

      <div className="flex overflow-hidden gap-6">
        <AnimatePresence initial={false}>
          {visiblePackages.map((pkg) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative flex-shrink-0 w-[32%] flex flex-col bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition"
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
                  {pkg.subtitle}
                </p>
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
        </AnimatePresence>
      </div>
    </div>
  );
}
