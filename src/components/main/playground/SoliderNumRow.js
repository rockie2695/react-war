//react
import { useEffect, startTransition, useState } from "react";

//react responsive
import MediaQuery from "react-responsive";

//redux
import { useSelector } from "react-redux";
import RoundEle from "./RoundEle";

const SoliderNumRow = () => {
  console.log("render soliderNumRow");
  //redux
  const leaders = useSelector((state) => state.leaderReducer.real);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);
  const [sideSoliderNum, setSideSoliderNum] = useState({ my: 0, enemy: 0 });
  //useEffect
  useEffect(() => {
    startTransition(() => {
      //show delay data
      setSideSoliderNum({ my: 0, enemy: 0 });
      const leaderLevelArray = [...Array(leaderLevel).keys()]
        .map((rowLeaderLevel) => rowLeaderLevel + 1)
        .reverse();
      for (const rowLeaderLevel of leaderLevelArray) {
        if (leaders[rowLeaderLevel].length === 0) {
          continue;
        }
        ["my", "enemy"].forEach((side) => {
          const sideLeader = leaders[rowLeaderLevel].filter(
            (rowLeader) => rowLeader.side === side
          );
          if (sideLeader.length !== 0) {
            setSideSoliderNum((prev) => {
              return {
                ...prev,
                ...{
                  [side]:
                    prev[side] +
                    sideLeader.reduce((a, b) => a + b.soliderNum, 0),
                },
              };
            });
          }
        });
      }
    });
  }, [leaders, leaderLevel]);

  return (
    <div className="grid md:grid-cols-11 grid-cols-2 md:gap-4 gap-2 h-12">
      <div className="md:col-span-4 h-full flex justify-center items-center text-blue-600 font-bold text-lg">
        {sideSoliderNum.my}
      </div>

      <MediaQuery minWidth={768}>
        <div className="col-span-3">
          <RoundEle />
        </div>
      </MediaQuery>

      <div className="md:col-span-4 h-full flex justify-center items-center text-red-600 font-bold text-lg">
        {sideSoliderNum.enemy}
      </div>
    </div>
  );
};
export default SoliderNumRow;
