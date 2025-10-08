import { HeaderBackground } from "@/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PackageCard() {
  const router = useRouter();
  const packages = [
    {
      route: "ChiangMai",
      title: "Chiang Mai Package",
      price: "5days",
      desc: "Perfect for a quick weekend getaway. Includes 2 nights stay and guided city tour.",
      img: HeaderBackground,
    },
    {
      route: "AngkorWat",
      title: "Angkor Wat Package",
      price: "$799",
      desc: "Explore mountains and rivers with hiking, rafting, and camping included.",
      img: HeaderBackground,
    },
    {
      route: "3Countries",
      title: "Travel 3 countries Package",
      price: "$1,499",
      desc: "5-star hotels, private tours, and fine dining for the ultimate experience.",
      img: HeaderBackground,
    },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {packages.map((pkg, index) => (
        <motion.article
          key={pkg.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="relative flex flex-col bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition"
        >
          {/* Image Section */}
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={pkg.img}
              alt={pkg.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
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
              {pkg.desc}
            </p>
            {/* Button */}
            <div className="mt-auto">
              <button
                onClick={() => router.push(`/Packages/${pkg.route}`)}
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
