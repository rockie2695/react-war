//react
import { memo } from "react";

const InputBox = memo(
  ({ objInReducer, onChangeFunc, inputValue, maxValue, ...props }) => {
    const handleInputChange = (event) => {
      let name = objInReducer.name;
      let value = event.target.value;
      if (event.target.type === "number") {
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
        if (
          objInReducer?.minLength &&
          typeof objInReducer.minLength === "number" &&
          value.length < objInReducer.minLength
        ) {
          return;
        }
        if (
          objInReducer?.maxLength &&
          typeof objInReducer.maxLength === "number" &&
          value.length > objInReducer.maxLength
        ) {
          return;
        }
        if (maxValue && typeof maxValue === "number" && value > maxValue) {
          return;
        }
        if (onChangeFunc) {
          onChangeFunc(name, value);
        }
      } else if (event.target.type === "text") {
        if (
          objInReducer?.minLength &&
          typeof objInReducer.minLength === "number" &&
          value.length < objInReducer.minLength
        ) {
          return;
        }
        if (
          objInReducer?.maxLength &&
          typeof objInReducer.maxLength === "number" &&
          value.length > objInReducer.maxLength
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
        maxLength={objInReducer.maxLength || maxValue?.toString().length}
        min={objInReducer.min}
        max={objInReducer.max || maxValue}
        value={objInReducer.value || inputValue}
        step={objInReducer.step}
        onChange={handleInputChange}
      />
    );
  }
);

export default InputBox;
