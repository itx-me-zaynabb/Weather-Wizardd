import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather, getForecast } from "../services/weatherApi";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function WeatherPage() {
  const { city } = useParams();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([getWeather(city), getForecast(city)])
      .then(([w, f]) => {
        setWeather(w);
        setForecast(f.list.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <Loader />;
  if (!weather) return <p className="text-white text-center">No Data</p>;

  const getIcon = (type) => {
    if (type.includes("Rain")) return "🌧";
    if (type.includes("Cloud")) return "☁";
    if (type.includes("Clear")) return "☀";
    return "🌍";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white p-6 relative">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-purple-500 blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500 blur-3xl opacity-20 bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl max-w-md mx-auto"
      >
        <h1 className="text-3xl font-bold">{weather.name}</h1>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl"
        >
          {getIcon(weather.weather[0].main)}
        </motion.div>

        <p className="text-5xl">{Math.round(weather.main.temp)}°C</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>💧 {weather.main.humidity}%</div>
          <div>🌬 {weather.wind.speed} m/s</div>
        </div>
      </motion.div>

      {/* Forecast */}
      <div className="flex gap-4 mt-6 overflow-x-auto">
        {forecast.map((f, i) => (
          <div key={i} className="bg-white/10 p-4 rounded-xl min-w-[120px]">
            <p>{new Date(f.dt_txt).getHours()}:00</p>
            <p>{Math.round(f.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
