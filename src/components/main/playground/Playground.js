//react
import { memo, useCallback, useEffect, useState } from "react";

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
import { setReport, setStop } from "../../../features/report/reportSlice";

//react responsive
import MediaQuery from "react-responsive";

const Playground = () => {
  console.log("render Playground");
  //redux
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);
  const report = useSelector((state) => state.reportReducer);
  const stop = useSelector((state) => state.reportReducer.stop);
  const dispatch = useDispatch();

  // //state
  // const [fightTimeoutLoop, setFightTimeoutLoop] = useState(null);

  // const test = useCallback(
  //   (isSetTimeout) => {
  //     if (isSetTimeout) {
  //       setFightTimeoutLoop(
  //         setInterval(() => {
  //           console.log("run setTimeout");
  //           dispatch(setReport({ history: report.history.slice(1) }));
  //         }, 2000)
  //       );
  //     } else {
  //       clearInterval(fightTimeoutLoop);
  //       setFightTimeoutLoop(null);
  //     }
  //   },
  //   [dispatch, fightTimeoutLoop, report.history]
  // );

  // useEffect(() => {
  //   console.log("run useEffect");
  //   if (report.history.length === 0 || fightTimeoutLoop !== null) {
  //     return;
  //   }
  //   if (stop === false) {
  //     //start settimeout
  //     test(true);
  //   } else {
  //     //break settimeout
  //     test(false);
  //   }
  //   return () => {
  //     console.log("return");
  //     //break settimeout
  //     test(false);
  //   };
  // }, [fightTimeoutLoop, report.history.length, stop, test]);

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

        <NormalButton className="w-full h-10">add higher level</NormalButton>

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
        <NormalButton className="w-full h-10">add lower level</NormalButton>
      </div>
    </div>
  );
};

export default Playground;
