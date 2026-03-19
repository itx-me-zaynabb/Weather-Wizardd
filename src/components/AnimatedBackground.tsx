import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  weatherType: string;
}

export default function AnimatedBackground({ weatherType }: AnimatedBackgroundProps) {
  // Map weather types to emojis
  const weatherEmojisMap: Record<string, string[]> = {
    Clear: ["☀️", "🌤️"],
    Clouds: ["☁️", "🌥️", "⛅"],
    Rain: ["🌧️", "⛈️", "💦"],
    Snow: ["❄️", "🌨️"],
    Drizzle: ["🌦️", "💧"],
    Thunderstorm: ["🌩️", "⚡"],
    Mist: ["🌫️", "💨"],
    Default: ["🌍", "🌈"],
  };

  const clouds = ["☁️", "🌥️", "⛅"];
  const emojis = weatherEmojisMap[weatherType] || weatherEmojisMap.Default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clouds */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute text-4xl opacity-30"
          initial={{ x: -100, y: Math.random() * 200 }}
          animate={{ x: 1200 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 50 + Math.random() * 20,
            ease: "linear",
          }}
        >
          {clouds[Math.floor(Math.random() * clouds.length)]}
        </motion.div>
      ))}

      {/* Floating Weather Emojis */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`emoji-${i}`}
          className="absolute text-2xl"
          initial={{ x: Math.random() * 1200, y: 600 }}
          animate={{ y: -100 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20 + Math.random() * 15,
            ease: "easeInOut",
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.div>
      ))}
    </div>
  );
}