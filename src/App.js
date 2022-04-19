import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Showcase from "./components/Showcase";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import People from "./components/People";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<Showcase />} path={"/"} />
        <Route element={<People />} path={"/people"} />
      </Routes>
    </div>
  );
}

export default App;
