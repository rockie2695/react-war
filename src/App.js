import "./App.css";
import AnimationRoutes from "./components/AnimationRoutes";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App flex md:flex-row flex-col h-full w-full">
      <BrowserRouter>
        <Header />
        <AnimationRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
