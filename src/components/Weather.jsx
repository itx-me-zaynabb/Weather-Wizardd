import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark); // ✅ FIX
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Enter city name");
      return;
    }

    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const apiKey = "f9af8cff645b7ef7b8675f03b27f0e4b";

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      setWeather(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appWrapper">
      <button className="themeBtn" onClick={() => setDark(!dark)}>
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>

      <div className="Container">
        <h1>🌤 Weather Pro</h1>

        <input
          className="inputField"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="Enter city..."
        />

        <button className="btn" onClick={fetchWeather}>
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {error && <p className="error">{error}</p>}
        {loading && <div className="loader"></div>}

        {weather && !loading && (
          <div className="weatherBox">
            <h3>
              {weather.name}, {weather.sys.country}
            </h3>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />

            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p className="desc">{weather.weather[0].description}</p>

            <div className="extra">
              <span>💧 {weather.main.humidity}%</span>
              <span>🌡 {Math.round(weather.main.feels_like)}°C</span>
              <span>💨 {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
