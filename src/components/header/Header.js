import { Link } from "react-router-dom";
import Tab from "./Tab";

export default function Header() {
  return (
    <header>
      <nav className="flex md:flex-col flex-row bg-black h-full text-white text-base">
        <Tab title="react war" className="text-xl font-bold capitalize" />
        <Link to="/playground">
          <Tab title="Playground" />
        </Link>
        <Link to="/setting">
          <Tab title="Setting" />
        </Link>
      </nav>
    </header>
  );
}
