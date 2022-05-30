import "react-circular-progressbar/dist/styles.css";

import Header from "../Header";
import TableRow from "./TableRow";
import SideNameRow from "./SideNameRow";

import { Virtuoso } from "react-virtuoso";

import NormalButton from "../NormalButton";

//redux
import { useSelector } from "react-redux";

const Playground = () => {
  console.log("render Playground");
  //redux
  const leaders = useSelector((state) => state.leaderReducer.value);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer.value);

  //function

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <h2>war table</h2>
        <SideNameRow />
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
                rowLeaders={leaders[leaderLevel]}
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
