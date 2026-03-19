import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[300px]">
        <h1 className="text-4xl font-bold text-center mb-6 animate-pulse">
          🌤 Weather Wizard 🌈
        </h1>
        <SearchBar />
      </div>
    </div>
  );
}
