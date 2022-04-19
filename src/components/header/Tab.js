import PropTypes from "prop-types";

export default function Tab({ title, ...prop }) {
  return (
    <div
      className={
        "py-2 px-4 w-full text-lg " + (prop?.className ? prop.className : "")
      }
    >
      {title}
    </div>
  );
}

Tab.prototype.propTypes = {
  title: PropTypes.string.isRequired,
};
