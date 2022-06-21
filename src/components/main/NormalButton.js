//react
import { memo } from "react";

//ripple effect
import Ripples from "react-ripples";

const NormalButton = memo(({ ...props }) => {
  return (
    <Ripples className={props?.className ? props.className : "h-10"}>
      <button
        className={
          "w-full h-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 flex items-center justify-center rounded-lg" +
          (props.hasOwnProperty("roundedClassName")
            ? " " + props.roundedClassName
            : "")
        }
        aria-label={props["aria-label"]}
        onClick={props?.onClick}
      >
        {props?.children}
      </button>
    </Ripples>
  );
});

export default NormalButton;
