import AnimatedBackground from "../components/AnimatedBackground";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCardjsx";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather, getForecast } from "../services/WeatherAPI";

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
  if (!weather)
    return <p className="text-white text-center mt-20">No Data Found</p>;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-500 to-purple-700 text-white p-6 overflow-hidden">
      {/* Animated Clouds & Emojis */}
      <AnimatedBackground weatherType={weather.weather[0].main} />
      {/* Weather Card */}
      <WeatherCard weather={weather} />

      {/* Forecast */}
      <ForecastCard forecast={forecast} />
    </div>
  );
}
