//react
import { memo } from "react";

const InputBox = memo(({ objInReducer, onChangeFunc, ...props }) => {
  const handleInputChange = (event) => {
    if (event.target.type === "number") {
      let name = objInReducer.name;
      let value = event.target.value;
      if (!objInReducer?.step) {
        value = parseInt(value);
      } else {
        value = parseFloat(value);
      }
      if (isNaN(value)) {
        return;
      }
      if (
        objInReducer?.min &&
        typeof objInReducer.min === "number" &&
        value < objInReducer.min
      ) {
        return;
      }
      if (
        objInReducer?.max &&
        typeof objInReducer.max === "number" &&
        value > objInReducer.max
      ) {
        return;
      }
      if (onChangeFunc) {
        onChangeFunc(name, value);
      }
    }
  };
  return (
    <input
      type={objInReducer.type}
      id={objInReducer.name}
      name={objInReducer.name}
      className={
        props?.className
          ? "rounded p-1 text-center " + props.className
          : "rounded p-1 text-center"
      }
      minLength={objInReducer.minLength}
      maxLength={objInReducer.maxLength}
      min={objInReducer.min}
      max={objInReducer.max}
      value={objInReducer.value}
      step={objInReducer.step}
      onChange={handleInputChange}
    />
  );
});

export default InputBox;
