//proptypes
import PropTypes from "prop-types";

//react
import { memo } from "react";

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

//random js
import { randomInteger, randomPeopleName } from "../../../script/random";

import NormalButton from "../NormalButton";

const TableRow = memo(({ rowLeaderLevel, ...props }) => {
  //redux
  const leaders = useSelector((state) => state.leaderReducer.value);
  const dispatch = useDispatch();

  const selfAddLeader = (index, side) => {
    [...Array(100)].forEach((_, i) => {
      dispatch(
        addLeader({
          leaderLevel: index,
          name: randomPeopleName().name,
          soliderNum: 100,
          maxSoliderNum: 100,
          leaderPower: randomInteger(1, 10),
          side: side,
        })
      );
    });
  };

  return (
    <div className={"grid grid-cols-2 md:gap-4 gap-2 " + props.className}>
      {["my", "enemy"].map((side, index) => (
        <div
          className={
            "md:p-4 p-2 grid grid-cols-3 md:gap-4 gap-2 md:grid-cols-5 2xl:grid-cols-10 self-start rounded h-full content-start " +
            (side === "my" ? "bg-blue-100" : "bg-red-100")
          }
          key={index}
        >
          {leaders
            .filter(
              (leader) =>
                leader.leaderLevel === rowLeaderLevel && leader.side === side
            )
            .map((leader, index2) => (
              <div key={index2}>
                <CircularProgressbarWithChildren
                  value={(leader.soliderNum / leader.maxSoliderNum) * 100}
                  background={true}
                  styles={buildStyles({ backgroundColor: "#ffffff" })}
                >
                  <div className="text-xs md:text-sm ">
                    <span className="truncate">{leader.name}</span>
                  </div>
                  <div className="text-xs md:text-sm">
                    <span>
                      {(leader.soliderNum / leader.maxSoliderNum) * 100}%
                    </span>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            ))}

          <NormalButton
            onClick={() => selfAddLeader(rowLeaderLevel, side)}
            className="h-full aspect-square"
            aria-label="add leader in this row"
          >
            <MdAdd />
          </NormalButton>
        </div>
      ))}
    </div>
  );
});

export default TableRow;

TableRow.propTypes = {
  rowLeaderLevel: PropTypes.number.isRequired,
};
