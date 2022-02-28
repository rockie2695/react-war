import { Link } from "react-router-dom";

export default function BB() {
  return (
    <header>
      <nav>
        <Link to="/playground">Playground</Link>
        <Link to="/setting">Setting</Link>
      </nav>
    </header>
  );
}
