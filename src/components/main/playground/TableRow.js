//proptypes
import PropTypes from "prop-types";

//react
import { memo, useCallback } from "react";

//circle
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

//material ui
import { MdAdd } from "react-icons/md";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addLeader } from "../../../features/leader/leaderSlice";
import { addLeaderId } from "../../../features/leader/leaderIdSlice";
import {
  setMouseOverLeader,
  setClickedLeader,
} from "../../../features/leader/selectedLeaderSlice";

//random js
import { randomInteger, randomPeopleName } from "../../../script/random";

//local component
import NormalButton from "../NormalButton";

const TableRow = ({ rowLeaderLevel, handleMouseMove, ...props }) => {
  console.log("render TableRow " + rowLeaderLevel);

  //redux
  const setting = useSelector((state) => state.settingReducer);
  const leaderId = useSelector((state) => state.leaderIdReducer);
  const leaders = useSelector((state) => state.leaderReducer.real);
  const report = useSelector((state) => state.reportReducer);
  const rowLeaders = leaders[rowLeaderLevel];
  const dispatch = useDispatch();

  const selfAddLeader = useCallback(
    (index, side) => {
      [...Array(setting.numAddPeople.value)].forEach((_, i) => {
        dispatch(
          addLeader({
            leaderLevel: index,
            name: randomPeopleName().name,
            soliderNum: 100,
            maxSoliderNum: 100,
            leaderPower: randomInteger(1, 10),
            side: side,
            id: leaderId + i,
          })
        );
        dispatch(addLeaderId());
      });
    },
    [dispatch, leaderId, setting.numAddPeople.value]
  );

  return (
    <div className={"grid grid-cols-2 md:gap-4 gap-2 " + props.className}>
      {["my", "enemy"].map((side, index) => (
        <div
          className={
            "md:p-2 p-1 grid grid-cols-3 md:gap-2 gap-1 md:grid-cols-5 2xl:grid-cols-10 self-start rounded-lg h-full content-start " +
            (side === "my" ? "bg-blue-100" : "bg-red-100")
          }
          key={index}
        >
          {rowLeaders
            .filter((leader) => leader.side === side)
            .map((leader, index2) => (
              <div
                key={index2}
                className={
                  "border-2 hover:border-zinc-700 p-1 rounded-lg hover:ease-in-out border-transparent cursor-pointer" +
                  (typeof leader.borderColor !== "undefined" &&
                  leader.borderColor === "red"
                    ? " border-red-600"
                    : "") +
                  (typeof leader.borderColor !== "undefined" &&
                  leader.borderColor === "blue"
                    ? " border-blue-600"
                    : "")
                }
                onMouseEnter={(e) => {
                  dispatch(setMouseOverLeader(leader));
                  handleMouseMove(e, true);
                }}
                onMouseLeave={() => {
                  dispatch(setMouseOverLeader(null));
                }}
                onClick={() => {
                  dispatch(setClickedLeader(leader));
                }}
                style={{
                  transitionDuration:
                    setting.eachFightPlayTime.value * 1000 * 0.3 + "ms",
                }}
              >
                <CircularProgressbarWithChildren
                  value={(leader.soliderNum / leader.maxSoliderNum) * 100}
                  background={true}
                  styles={buildStyles({
                    backgroundColor: "#ffffff",
                    // Colors
                    pathColor:
                      leader.soliderNum / leader.maxSoliderNum > 0.7
                        ? "rgb(59 130 246)" //bg-blue-500
                        : leader.soliderNum / leader.maxSoliderNum > 0.3
                        ? "rgb(249 115 22)" //bg-orange-500
                        : "rgb(239 68 68)", //bg-red-500
                  })}
                >
                  <div className="text-xs md:text-sm bg-white/50 rounded-lg">
                    <span className="truncate">{leader.name}</span>
                  </div>
                  <div className="text-xs md:text-sm bg-white/50 rounded-lg">
                    <span>
                      {setting.showSoliderNumOrPerc.value === "percentage" &&
                        parseInt(
                          (leader.soliderNum / leader.maxSoliderNum) * 100
                        ) + "%"}
                      {setting.showSoliderNumOrPerc.value === "soliderNum" &&
                        leader.soliderNum}
                    </span>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            ))}
          {report.history.length === 0 && report.cloneHistory.length === 0 && (
            <NormalButton
              onClick={() => selfAddLeader(rowLeaderLevel, side)}
              className="h-full aspect-square"
              aria-label="add leader in this row"
            >
              <MdAdd />
            </NormalButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(TableRow);

TableRow.propTypes = {
  rowLeaderLevel: PropTypes.number.isRequired,
};
