import logo from "./logo.svg";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import AnimationRoutes from "./AnimationRoutes";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AnimationRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
