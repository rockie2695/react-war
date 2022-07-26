import "./App.css";
import AnimationRoutes from "./page/AnimationRoutes";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App flex md:flex-row flex-col w-full min-h-full h-auto font-sans">
      <BrowserRouter>
        <Header />
        <AnimationRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
