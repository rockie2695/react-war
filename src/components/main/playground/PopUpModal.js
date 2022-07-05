//react
import { memo } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";

const PopUpModal = () => {
  //redux
  const mouseOverLeader = useSelector((state) => state.mouseOverLeaderReducer);
  return mouseOverLeader ? (
    <div
      class="bg-gray-500"
      style={{
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        height: "100%",
        "z-index": 1,
      }}
    >
      test
    </div>
  ) : null;
};
export default memo(PopUpModal);
