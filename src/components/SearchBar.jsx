import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=YOUR_API_KEY`,
        )
          .then((res) => res.json())
          .then(setSuggestions);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="p-3 rounded-xl bg-white/10 border border-white/30 w-full"
      />

      {suggestions.length > 0 && (
        <div className="absolute bg-black/80 w-full mt-2 rounded-xl">
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => navigate(`/weather/${s.name}`)}
              className="p-2 hover:bg-white/10 cursor-pointer"
            >
              {s.name}, {s.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
