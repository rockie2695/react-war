//circle
import "react-circular-progressbar/dist/styles.css";

//virtual list
import { Virtuoso } from "react-virtuoso";

//local file
import Header from "../Header";
import TableRow from "./TableRow";
import SideNameRow from "./SideNameRow";
import NormalButton from "../NormalButton";

//redux
import { useSelector } from "react-redux";

//react responsive
import MediaQuery from "react-responsive";

const Playground = () => {
  console.log("render Playground");
  //redux
  const leaderLevel = useSelector((state) => state.leaderLevelReducer.value);

  //function

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <h2>war table</h2>
        <SideNameRow />

        <div className="grid md:grid-cols-11 grid-cols-2 md:gap-4 gap-2">
          <div className="md:col-span-4 h-full flex items-center">123</div>

          <MediaQuery minWidth={768}>
            <div className="col-span-3"></div>
          </MediaQuery>

          <div className="md:col-span-4 h-full flex items-center">321</div>
        </div>

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
