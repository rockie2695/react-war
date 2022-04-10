import PropTypes from "prop-types";

export default function Header({ title }) {
  return (
    <header>
      <h1 className="text-lg">{title}</h1>
    </header>
  );
}

Header.prototype.propTypes = {
  title: PropTypes.string.isRequired,
};
