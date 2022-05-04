import PropTypes from "prop-types";

export default function Header({ title }) {
  return (
    <header>
      <h1 className="text-lg bg-zinc-700 text-zinc-300 text-center shadow-md p-2">
        {title}
      </h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
