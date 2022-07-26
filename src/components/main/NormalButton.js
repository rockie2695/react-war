//react
import { memo, useState } from "react";

//ripple effect
import Ripples from "react-ripples";

//react responsive
import { useMediaQuery } from "react-responsive";

//css
import "../../css/NormalButton.css";

const NormalButton = memo(({ isMouseMove = false, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const mouseMoveFunc = (e) => {
    let rotateX =
      ((e.clientY -
        (e.target.getBoundingClientRect().top +
          e.target.getBoundingClientRect().height / 2)) /
        (e.target.getBoundingClientRect().height / 2)) *
      -35;
    let rotateY =
      ((e.clientX -
        (e.target.getBoundingClientRect().left +
          e.target.getBoundingClientRect().width / 2)) /
        (e.target.getBoundingClientRect().width / 2)) *
      35;
    setCoords({ x: rotateX.toFixed(2), y: rotateY.toFixed(2) });
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  let btnClass =
    isMouseMove && isDesktopOrLaptop
      ? {
          transform:
            "perspective(600px) rotateX(" +
            coords.x +
            "deg) rotateY(" +
            coords.y +
            "deg)",
          willChange: "transform",
          transformStyle: "preserve-3d",
        }
      : {};

  return (
    <Ripples className={props?.className ? props.className : "h-10"}>
      <button
        className={
          "normalButton w-full h-full p-1 border border-gray-300 hover:ease-in-out flex items-center justify-center rounded-lg transition-all duration-300 hover:shadow " +
          (props.hasOwnProperty("roundedClassName")
            ? " " + props.roundedClassName
            : "")
        }
        style={btnClass}
        aria-label={props["aria-label"]}
        onClick={props?.onClick}
        onMouseMove={(e) => {
          if (isMouseMove && isDesktopOrLaptop) {
            mouseMoveFunc(e);
          }
        }}
        onMouseLeave={() => {
          if (isMouseMove && isDesktopOrLaptop) {
            setCoords({ x: 0, y: 0 });
          }
        }}
      >
        {props?.children}
      </button>
    </Ripples>
  );
});

export default NormalButton;
