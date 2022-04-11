import { Link, useResolvedPath, useMatch } from "react-router-dom";
import Tab from "./Tab";

export default function Header() {
  return (
    <header className="bg-zinc-800">
      <nav className="flex md:flex-col flex-row  text-white text-base shadow-md md:border-r md:border-b-0 border-gray-500 border-b h-auto top-0 sticky ">
        <Tab title="react war" className="text-xl font-bold capitalize" />
        <CustomLink
          to="/playground"
          className="flex items-center hover:bg-white hover:text-black hover:ease-in-out duration-300"
        >
          <Tab title="Playground" />
        </CustomLink>
        <CustomLink
          to="/setting"
          className="flex items-center hover:bg-white hover:text-black hover:ease-in-out duration-300"
        >
          <Tab title="Setting" />
        </CustomLink>
      </nav>
    </header>
  );
}
/*position: sticky;
    top: 0px;
    height: auto;*/
function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      to={to}
      {...props}
      className={
        match ? "bg-white text-black " + props.className : props.className
      }
    >
      {children}
    </Link>
  );
}
