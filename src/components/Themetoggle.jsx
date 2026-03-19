import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-5 right-5 px-4 py-2 rounded-lg bg-white/10 text-white"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
