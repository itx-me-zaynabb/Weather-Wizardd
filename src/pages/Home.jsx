import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/Themetoggle";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 dark:from-gray-900 dark:to-black transition-colors duration-700 relative">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Main Content */}
      <div className="w-full max-w-sm px-6 text-center">
        <h1
          className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent 
                       bg-gradient-to-r from-yellow-300 via-white to-pink-400 
                       dark:from-white dark:via-gray-300 dark:to-purple-400 
                       animate-pulse"
        >
          🌤 Weather Wizard 🌈
        </h1>

        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
}
