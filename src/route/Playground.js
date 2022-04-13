import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd, MdPlayArrow } from "react-icons/md";

import Header from "../components/main/Header";
import { addLeader } from "../features/leader/leaderSlice";
import { randomInteger, randomPeopleName } from "../script/random";

export default function Playground() {
  //var
  const [percentage, setPercentage] = useState(100); //for testing

  //redux
  const leaders = useSelector((state) => state.leaderReducer.value);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer.value);
  const dispatch = useDispatch();

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2">
        <div>
          <button className="h-12 w-12 bg-gray-300">
            <MdPlayArrow />
          </button>
        </div>
        <h2>war table</h2>
        <div className="grid grid-cols-2 md:gap-4 gap-2">
          <div className="col-span-2">
            <button className="w-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded">
              add higher level
            </button>
          </div>
          {[...Array(leaderLevel).keys()].map((item, index) => (
            <React.Fragment key={index}>
              {["my", "enemy"].map((side, index2) => (
                <div
                  className={
                    "md:p-4 p-2 grid grid-cols-3 md:gap-4 gap-2 md:grid-cols-5 2xl:grid-cols-10 self-start " +
                    (side === "my" ? "bg-blue-100" : "bg-red-100")
                  }
                  key={index2}
                >
                  {leaders
                    .filter(
                      (leader) =>
                        leader.leaderLevel === index + 1 && leader.side === side
                    )
                    .map((leader, index) => (
                      <div key={index}>
                        <CircularProgressbarWithChildren
                          value={
                            (leader.soliderNum / leader.maxSoliderNum) * 100
                          }
                          background={true}
                          styles={buildStyles({ backgroundColor: "#ffffff" })}
                        >
                          <div className="text-xs md:text-sm">
                            <span>{leader.name}</span>
                          </div>
                          <div className="text-xs md:text-sm">
                            <span>
                              {(leader.soliderNum / leader.maxSoliderNum) * 100}
                              %
                            </span>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    ))}
                  <div>
                    <button
                      onClick={() =>
                        dispatch(
                          addLeader({
                            leaderLevel: index + 1,
                            name: randomPeopleName().name,
                            soliderNum: 100,
                            maxSoliderNum: 100,
                            leaderPower: randomInteger(1, 10),
                            side: side,
                          })
                        )
                      }
                      className="p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded aspect-square w-full flex items-center justify-center"
                    >
                      <MdAdd />
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
          <div className="col-span-2">
            <button className="w-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded">
              add lower level
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
