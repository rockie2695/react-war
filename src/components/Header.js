import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="flex md:flex-col flex-row bg-gray-900 h-full text-white">
        <span>react-war</span>
        <Link to="/playground">Playground</Link>
        <Link to="/setting">Setting</Link>
      </nav>
    </header>
  );
}
