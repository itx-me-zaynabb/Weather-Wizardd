import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WeatherPage from "./pages/WeatherPage";
import ThemeToggle from "./components/Themetoggle";

function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
