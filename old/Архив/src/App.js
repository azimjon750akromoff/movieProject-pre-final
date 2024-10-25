import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Genres from "./pages/Genres/Genres";
import Country from "./pages/Country/Country";
import Movies from "./pages/Movies/Movies";
import TvSeries from "./pages/TV-Series/TvSeries";
import IMDb from "./pages/Top IMDb/IMDb";
import Zeropage from "./pages/zeropage/zeropage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Zeropage />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/genres" element={<Genres />} />
        </Routes>

        <Routes>
          <Route path="/country" element={<Country />} />
        </Routes>

        <Routes>
          <Route path="/movies" element={<Movies />} />
        </Routes>

        <Routes>
          <Route path="/tvseries" element={<TvSeries />} />
        </Routes>

        <Routes>
          <Route path="/imdb" element={<IMDb />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
