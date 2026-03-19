export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-40 bg-gray-700 rounded"></div>
        <div className="h-20 w-60 bg-gray-700 rounded"></div>
        <div className="h-10 w-32 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
