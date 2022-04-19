import PropTypes from "prop-types";

export default function Header({ title }) {
  return (
    <header>
      <h1 className="text-lg bg-zinc-700 text-white text-center shadow-md p-2">
        {title}
      </h1>
    </header>
  );
}

Header.prototype.propTypes = {
  title: PropTypes.string.isRequired,
};
