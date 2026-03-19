import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[300px]">
        <SearchBar />
      </div>
    </div>
  );
}
