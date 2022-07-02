//react
import { memo } from "react";

//redux
import { useSelector } from "react-redux";

//react responsive
import MediaQuery from "react-responsive";

const LeaderMouseOverEle = ({ mouseCoords }) => {
  //redux
  const mouseOverLeader = useSelector((state) => state.mouseOverLeaderReducer);

  return (
    mouseOverLeader !== null && (
      <MediaQuery minWidth={768}>
        <div
          className="w-48 bg-white border border-gray-400 rounded p-1"
          style={{
            position: "absolute",
            top: mouseCoords.y,
            left: mouseCoords.x,
          }}
        >
          test
        </div>
      </MediaQuery>
    )
  );
};
export default memo(LeaderMouseOverEle);
