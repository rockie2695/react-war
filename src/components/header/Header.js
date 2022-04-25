import { Link, useResolvedPath, useMatch } from "react-router-dom";
import Tab from "./Tab";

export default function Header() {
  return (
    <header className="bg-zinc-700 shadow-md md:border-r md:border-b-0 border-gray-500 border-b">
      <nav className="flex md:flex-col flex-row text-base h-auto top-0 sticky ">
        <Tab
          title="react war"
          className="text-white text-xl font-bold capitalize border-b border-zinc-500"
        />
        <CustomLink
          to="/playground"
          className="flex items-center hover:bg-zinc-300 hover:text-zinc-700 hover:ease-in-out duration-300"
        >
          <Tab title="Playground" />
        </CustomLink>
        <CustomLink
          to="/setting"
          className="flex items-center hover:bg-zinc-300 hover:text-zinc-700 hover:ease-in-out duration-300"
        >
          <Tab title="Setting" />
        </CustomLink>
      </nav>
    </header>
  );
}
function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      to={to}
      {...props}
      className={
        match
          ? "bg-white text-black " + props.className
          : "text-zinc-300 " + props.className
      }
    >
      {children}
    </Link>
  );
}
