import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

type SocialColors = {
  [key: string]: string;
};

const socialColors: SocialColors = {
  WhatsApp: "bg-green-500",
  Messenger: "bg-blue-600",
  Telegram: "bg-sky-400",
  Viber: "bg-purple-500",
  Instagram: "bg-pink-500",
  Facebook: "bg-blue-700",
  Tiktok: "bg-black",
};

export default function SocialButton({
  href,
  Icon,
  label,
  delay,
}: {
  href: string;
  Icon: React.ElementType;
  label: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  const jumpAnimation = (delay: number): Variants => ({
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 0.8,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      },
    },
  });

  // fallback to orange if label not in socialColors
  const hoverColor = socialColors[label] || "bg-orange-500";

  return (
    <motion.div
      variants={!hovered ? jumpAnimation(delay) : undefined}
      initial="initial"
      animate="animate"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <AnimatePresence mode="wait">
          {!hovered ? (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-white text-2xl"
            >
              <Icon />
            </motion.div>
          ) : (
            <motion.div
              key="label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-2 ${hoverColor} text-white rounded-lg shadow-lg font-semibold text-sm`}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.div>
  );
}
