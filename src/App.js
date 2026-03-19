import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WeatherPage from "./pages/WeatherPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
