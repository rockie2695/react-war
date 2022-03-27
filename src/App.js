import "./App.css";
import AnimationRoutes from "./components/AnimationRoutes";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App flex md:flex-row flex-col h-full">
      <BrowserRouter>
        <Header />
        <AnimationRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
