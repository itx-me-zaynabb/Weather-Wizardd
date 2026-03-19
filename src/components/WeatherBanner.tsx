import { motion } from "framer-motion";

interface WeatherBannerProps {
  weather: any;
}

export default function WeatherBanner({ weather }: WeatherBannerProps) {
  const { name, main, weather: weatherArray } = weather;
  const weatherType = weatherArray[0].main;

  // Map weather types to emojis
  const weatherEmojiMap: Record<string, string> = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Drizzle: "🌦️",
    Thunderstorm: "🌩️",
    Mist: "🌫️",
    Default: "🌍",
  };

  const emoji = weatherEmojiMap[weatherType] || weatherEmojiMap.Default;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-white/10 backdrop-blur-lg p-6 rounded-b-3xl text-center mx-auto mb-6 relative shadow-lg"
    >
      <h1 className="text-4xl font-bold mb-2">{name}</h1>
      <div className="flex items-center justify-center text-6xl mb-2">
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {emoji}
        </motion.span>
      </div>
      <p className="text-3xl font-semibold">{Math.round(main.temp)}°C</p>

      {/* Mini Animated Elements */}
      {weatherType === "Rain" && (
        <>
          <motion.div
            className="absolute top-0 left-10 text-xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            💧
          </motion.div>
          <motion.div
            className="absolute top-0 right-10 text-xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
          >
            💦
          </motion.div>
        </>
      )}

      {weatherType === "Clear" && (
        <motion.div
          className="absolute top-0 left-1/2 text-2xl"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          🌞
        </motion.div>
      )}
    </motion.div>
  );
}