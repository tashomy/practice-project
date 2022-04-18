import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Showcase from "./components/Showcase";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Showcase />
    </div>
  );
}

export default App;
