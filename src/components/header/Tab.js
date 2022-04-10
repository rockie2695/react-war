import PropTypes from "prop-types";

export default function Tab({ title, ...prop }) {
  return (
    <div
      className={
        "py-1 px-2 " +
        (prop?.className
          ? " " + prop.className
          : " hover:bg-white hover:text-black")
      }
    >
      {title}
    </div>
  );
}

Tab.prototype.propTypes = {
  title: PropTypes.string.isRequired,
};
