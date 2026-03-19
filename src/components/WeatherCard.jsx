import { motion } from "framer-motion";

interface WeatherCardProps {
  weather: any;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const getIcon = (type: string) => {
    if (type.includes("Rain")) return "🌧️";
    if (type.includes("Cloud")) return "☁️";
    if (type.includes("Clear")) return "☀️";
    if (type.includes("Snow")) return "❄️";
    return "🌍";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl max-w-md mx-auto text-center shadow-lg relative"
    >
      <h1 className="text-4xl font-bold mb-2">{weather.name}</h1>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-7xl mb-4"
      >
        {getIcon(weather.weather[0].main)}
      </motion.div>

      <p className="text-5xl font-semibold">{Math.round(weather.main.temp)}°C</p>

      <div className="mt-6 flex justify-around text-lg font-medium">
        <div>💧 {weather.main.humidity}%</div>
        <div>🌬 {weather.wind.speed} m/s</div>
      </div>

      {/* Glow circles */}
      <div className="absolute w-60 h-60 bg-purple-500 blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-60 h-60 bg-blue-500 blur-3xl opacity-20 bottom-10 right-10"></div>
    </motion.div>
  );
}