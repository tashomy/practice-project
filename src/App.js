import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import Showcase from "./components/Showcase";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import People from "./components/People";
import Movies from "./components/Movies";
import Spaceships from "./components/Spaceships";
import Vehicles from "./components/Vehicles";
import Species from "./components/Species";
import Planets from "./components/Planets";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<Showcase />} path={"/"} />
        <Route element={<People />} path={"/people"} />
        <Route element={<Movies />} path={"/films"} />
        <Route element={<Spaceships />} path={"/starships"} />
        <Route element={<Vehicles />} path={"/vehicles"} />
        <Route element={<Species />} path={"/species"} />
        <Route element={<Planets />} path={"/planets"} />
      </Routes>
    </div>
  );
}

export default App;
