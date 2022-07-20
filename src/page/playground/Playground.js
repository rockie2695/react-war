//react
import { memo, useState, startTransition, useCallback } from "react";

//circle
import "react-circular-progressbar/dist/styles.css";

//virtual list
import { Virtuoso } from "react-virtuoso";

//local file
import Header from "../../components/main/Header";
import TableRow from "../../components/main/playground/TableRow";
import SideNameRow from "../../components/main/playground/SideNameRow";
import NormalButton from "../../components/main/NormalButton";
import SoliderNumRow from "../../components/main/playground/SoliderNumRow";
import LeaderMouseOverEle from "../../components/main/playground/LeaderMouseOverEle";
import LeaderPopUpModal from "../../components/main/playground/LeaderPopUpModal";
import MessageBox from "../../components/main/playground/MessageBox";
import AttackOrderList from "../../components/main/playground/AttackOrderList";

//redux
import { useSelector, useDispatch } from "react-redux";
import MobileControlRow from "../../components/main/playground/MobileControlRow";
import {
  addLowerLeaderLevel,
  minusLowerLeaderLevel,
} from "../../reducers/leader/leaderLevelSlice";
import { moveLeaderToLevel } from "../../reducers/leader/leaderSlice";

//react responsive
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";

//react icons
import { MdSouth, MdNorth } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Playground = () => {
  console.log("render Playground");

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  //redux
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);
  const leader = useSelector((state) => state.leaderReducer);
  const report = useSelector((state) => state.reportReducer);
  const mouseOverLeader = useSelector(
    (state) => state.selectedLeaderReducer.mouseOverLeader
  );
  const clickedLeader = useSelector(
    (state) => state.selectedLeaderReducer.clickedLeader
  );
  const dispatch = useDispatch();

  //useState
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event, preventCheckLeader = false) => {
      if (isDesktopOrLaptop) {
        //show delay data
        if (mouseOverLeader !== null || preventCheckLeader) {
          let [x, y] = [event.clientX - 120, event.clientY + 20];
          let [divWidth, divHeight] = [
            document.querySelector('div[data-test-id="virtuoso-scroller"]')
              .clientWidth,
            document.querySelector('div[data-test-id="virtuoso-scroller"]')
              .clientHeight,
          ];
          if (x + 160 > divWidth) {
            x = x - 220;
          }
          if (y - 165 > divHeight) {
            y = y - 160;
          }
          startTransition(() => {
            setCoords({
              x: x, //event.clientX - event.target.offsetLeft - 130,
              y: y, //event.clientY - event.target.offsetTop - 260,
            });
          });
        }
      }
    },
    [isDesktopOrLaptop, mouseOverLeader]
  );
  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <h2 className="title text-lg font-bold">war table</h2>

        <MediaQuery maxWidth={767}>
          <MobileControlRow />
        </MediaQuery>

        <SideNameRow />

        <SoliderNumRow />

        {report.cloneHistory.length > 0 && <div className="w-full"><AttackOrderList /></div>}

        {report.history.length === 0 && report.cloneHistory.length === 0 && (
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
        )}

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
                handleMouseMove={handleMouseMove}
                //rowLeaders={leaders[leaderLevel]}
              />
            )}
            onMouseMove={handleMouseMove}
          />
          <LeaderMouseOverEle mouseCoords={coords} />
          {clickedLeader ? <LeaderPopUpModal /> : null}
        </div>
        {report.history.length === 0 && report.cloneHistory.length === 0 && (
          <div className="flex md:space-x-4 space-x-2">
            {leaderLevel > 1 && (
              <NormalButton
                className="w-full h-10"
                onClick={() => {
                  dispatch(minusLowerLeaderLevel());
                  if (leader.real[leaderLevel].length > 0) {
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
        )}
        {report.cloneHistory.length > 0 && <MessageBox />}
      </div>
    </div>
  );
};

export default memo(Playground);
