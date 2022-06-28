//react
import { memo } from "react";

//circle
import "react-circular-progressbar/dist/styles.css";

//virtual list
import { Virtuoso } from "react-virtuoso";

//local file
import Header from "../Header";
import TableRow from "./TableRow";
import SideNameRow from "./SideNameRow";
import NormalButton from "../NormalButton";
import SoliderNumRow from "./SoliderNumRow";

//redux
import { useSelector, useDispatch } from "react-redux";
import MobileControlRow from "./MobileControlRow";
import {
  addLowerLeaderLevel,
  minusLowerLeaderLevel,
} from "../../../features/leader/leaderLevelSlice";
import { moveLeaderToLevel } from "../../../features/leader/leaderSlice";

//react responsive
import MediaQuery from "react-responsive";

//react icons
import { MdSouth, MdNorth } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Playground = () => {
  console.log("render Playground");
  //redux
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);
  const leader = useSelector((state) => state.leaderReducer);
  const dispatch = useDispatch();

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <h2>war table</h2>

        <MediaQuery maxWidth={767}>
          <MobileControlRow />
        </MediaQuery>

        <SideNameRow />

        <SoliderNumRow />
        <div className="flex md:space-x-4 space-x-2">
          {leaderLevel > 1 && (
            <NormalButton
              className="w-full h-10"
              onClick={() => {
                dispatch(minusLowerLeaderLevel());
                for (let i = 1; i < leaderLevel; i++) {
                  dispatch(
                    moveLeaderToLevel({
                      fromLeaderLevel: i + 1,
                      toLeaderLevel: i,
                    })
                  );
                }
              }}
            >
              <AiOutlineMinus />
              <MdNorth />
              minus higher level
            </NormalButton>
          )}
          {leaderLevel < 10 && (
            <NormalButton
              className="w-full h-10"
              onClick={() => {
                dispatch(addLowerLeaderLevel());
                for (let i = leaderLevel; i >= 1; i--) {
                  dispatch(
                    moveLeaderToLevel({
                      fromLeaderLevel: i,
                      toLeaderLevel: i + 1,
                    })
                  );
                }
              }}
            >
              <AiOutlinePlus />
              <MdNorth />
              add higher level
            </NormalButton>
          )}
        </div>

        <div className="h-[50vh] overflow-hidden">
          <Virtuoso
            className="md:gap-4 gap-2"
            data={[...Array(leaderLevel).keys()].map(
              (rowLeaderLevel) => rowLeaderLevel + 1
            )}
            itemContent={(index, leaderLevel) => (
              <TableRow
                key={index}
                className={index > 0 ? "md:mt-4 mt-2" : ""}
                rowLeaderLevel={leaderLevel}
                //rowLeaders={leaders[leaderLevel]}
              />
            )}
          />
        </div>
        <div className="flex md:space-x-4 space-x-2">
          {leaderLevel > 1 && (
            <NormalButton
              className="w-full h-10"
              onClick={() => {
                dispatch(minusLowerLeaderLevel());
                if (leader.real[leaderLevel].length > 0) {
                  console.log("123");
                  for (let i = 1; i < leaderLevel; i++) {
                    dispatch(
                      moveLeaderToLevel({
                        fromLeaderLevel: i + 1,
                        toLeaderLevel: i,
                      })
                    );
                  }
                }
              }}
            >
              <AiOutlineMinus />
              <MdSouth />
              minus lower level
            </NormalButton>
          )}
          {leaderLevel < 10 && (
            <NormalButton
              className="w-full h-10"
              onClick={() => dispatch(addLowerLeaderLevel())}
            >
              <AiOutlinePlus />
              <MdSouth />
              add lower level
            </NormalButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Playground);
