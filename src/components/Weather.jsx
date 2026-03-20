import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const apiKey = "f9af8cff645b7ef7b8675f03b27f0e4b";

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim(),
        )}&appid=${apiKey}&units=metric`,
      );

      setWeather(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  const bg =
    weather?.main?.temp > 30
      ? "from-orange-400 to-red-500"
      : weather?.main?.temp < 10
        ? "from-blue-400 to-indigo-600"
        : "from-gray-700 to-gray-900";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${bg} text-white px-4`}
    >
      <h1 className="text-4xl font-bold mb-6 animate-pulse">🌤 Weather Pro</h1>

      <div className="flex gap-2 w-full max-w-md">
        <input
          className="flex-1 px-4 py-2 rounded-lg text-black outline-none shadow-lg"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="bg-black px-4 py-2 rounded-lg hover:scale-105 transition"
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && (
        <p className="mt-4 bg-red-500/20 px-4 py-2 rounded-lg">{error}</p>
      )}

      {loading && (
        <div className="mt-6 animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
      )}

      {weather && !loading && (
        <div className="mt-8 w-full max-w-md bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold">
            {weather.name}, {weather.sys?.country}
          </h2>

          <p className="text-sm opacity-80">{new Date().toLocaleString()}</p>

          <img
            className="mx-auto"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          <p className="text-4xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>

          <p className="capitalize text-lg">{weather.weather[0].description}</p>

          <div className="flex justify-between mt-6 text-sm">
            <div>
              <p>💧 Humidity</p>
              <p className="font-bold">{weather.main.humidity}%</p>
            </div>

            <div>
              <p>🌡 Feels</p>
              <p className="font-bold">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div>
              <p>💨 Wind</p>
              <p className="font-bold">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
