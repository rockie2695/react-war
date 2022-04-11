import PropTypes from "prop-types";

export default function Tab({ title, ...prop }) {
  return (
    <div
      className={
        "py-1 px-2 w-full " +
        (prop?.className ? prop.className : "")
      }
    >
      {title}
    </div>
  );
}

Tab.prototype.propTypes = {
  title: PropTypes.string.isRequired,
};
