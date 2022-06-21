import PropTypes from "prop-types";

export default function Header({ title }) {
  return (
    <header>
      <h1 className="text-lg bg-zinc-700 text-white/70 hover:text-white text-center shadow-md p-2 transition-colors">
        {title}
      </h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
