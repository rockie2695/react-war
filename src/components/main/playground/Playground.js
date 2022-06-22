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

//react responsive
import MediaQuery from "react-responsive";

//react icons
import { MdSouth, MdNorth } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Playground = () => {
  console.log("render Playground");
  //redux
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);
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
        <div className="grid grid-cols-2 md:gap-4 gap-2">
          <NormalButton className="w-full h-10">
            <AiOutlineMinus />
            <MdNorth />
            minus higher level
          </NormalButton>
          <NormalButton className="w-full h-10">
            <AiOutlinePlus />
            <MdNorth />
            add higher level
          </NormalButton>
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
        <div className="grid grid-cols-2 md:gap-4 gap-2">
          <NormalButton
            className="w-full h-10"
            onClick={() => dispatch(minusLowerLeaderLevel())}
          >
            <AiOutlineMinus />
            <MdSouth />
            minus lower level
          </NormalButton>
          <NormalButton
            className="w-full h-10"
            onClick={() => dispatch(addLowerLeaderLevel())}
          >
            <AiOutlinePlus />
            <MdSouth />
            add lower level
          </NormalButton>
        </div>
      </div>
    </div>
  );
};

export default memo(Playground);
