import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd, MdPlayArrow } from "react-icons/md";

import Header from "../components/main/Header";
import { addLeader } from "../features/leader/leaderSlice";
import { randomInteger, randomPeopleName, shuffle } from "../script/random";

export default function Playground() {
  //redux
  const leaders = useSelector((state) => state.leaderReducer.value);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer.value);
  const dispatch = useDispatch();

  const fight = async () => {
    //var
    let [report, round] = await roundFightLoop();
    console.log(report, round);
  };
  const roundFightLoop = () => {
    return new Promise((resolve) => {
      let report = [],
        round = 0,
        noDefender = false, //get leaders
        processLeaders = JSON.parse(JSON.stringify(leaders));

      //fight until other side leaders are dead
      while (!noDefender) {
        round++;
        console.log(round);
        //1.loop each level
        let level = [...Array(leaderLevel).keys()]
          .map((rowLeaderLevel) => rowLeaderLevel + 1)
          .reverse();
        for (const rowLevel of level) {
          if (round >= level.indexOf(rowLevel) + 1) {
            const [subNoDefender, subReport] = fightInEachLevel(
              rowLevel,
              processLeaders,
              round
            );

            noDefender = subNoDefender;
            report = [...report, ...subReport];
            if (noDefender) {
              break;
            }
          }
        }
      }

      if (noDefender) {
        console.log(processLeaders, report, round);
        return resolve([report, round]);
      }
    });
  };
  const fightInEachLevel = (rowLeaderLevel, processLeaders, round) => {
    let report = [],
      noDefender = false;
    let shuffleLeaderInSameLevel = shuffle(
      processLeaders.filter(
        (leader) =>
          leader.leaderLevel === rowLeaderLevel && leader.soliderNum > 0
      )
    );
    //2.loop each leader in same level
    for (let [index, row] of shuffleLeaderInSameLevel.entries()) {
      //find attacker
      let attacker = processLeaders.find((leader) => leader.id === row.id);
      if (attacker.soliderNum <= 0) {
        attacker = undefined;
      }
      if (!attacker) {
        continue;
      }
      //find defender
      let defender = findDefender(
        rowLeaderLevel,
        attacker.side,
        processLeaders
      );
      if (!defender) {
        noDefender = true;
        break;
      }
      //just fight
      [attacker, defender] = calFight(attacker, defender);
      //find attacker and defender from processLeaders
      let needChangeAttackerIndex = processLeaders.findIndex(
        (leader) => leader.id === attacker.id
      );
      let needChangeDefenderIndex = processLeaders.findIndex(
        (leader) => leader.id === defender.id
      );
      report.push([
        {
          round: round,
          attackerId: attacker.id,
          defenderId: defender.id,
          attackerBefore: processLeaders[needChangeAttackerIndex],
          defenderBefore: processLeaders[needChangeDefenderIndex],
          attackerAfter: attacker,
          defenderAfter: defender,
        },
      ]);
      //update attacker to processLeaders
      processLeaders[needChangeAttackerIndex] = {
        ...processLeaders[needChangeAttackerIndex],
        ...attacker,
      };
      //update defender to processLeaders
      processLeaders[needChangeDefenderIndex] = {
        ...processLeaders[needChangeDefenderIndex],
        ...defender,
      };
    }
    return [noDefender, report];
  };

  const calFight = (attacker, defender) => {
    let selfDefender = JSON.parse(JSON.stringify(defender));
    const attackerLeaderPowerTimes = 1 + (attacker.leaderPower / 100) * 5;

    selfDefender.soliderNum -= Math.max(
      randomInteger(
        parseInt(attacker.soliderNum * 0.09 * attackerLeaderPowerTimes),
        parseInt(attacker.soliderNum * 0.11 * attackerLeaderPowerTimes)
      ),
      attacker.leaderPower
    );

    return [attacker, selfDefender];
  };

  const findDefender = (
    rowLeaderLevel = 1,
    attackerSide = "my",
    processLeaders = []
  ) => {
    let defender = undefined;
    let defenderLeaders = processLeaders.filter(
      (leader) => leader.side !== attackerSide
    );
    const leaderLevelArray = [...Array(rowLeaderLevel).keys()]
      .map((rowLeaderLevel) => rowLeaderLevel + 1)
      .reverse();
    for (const rowLeaderLevel of leaderLevelArray) {
      let shuffleDefenderLeadersInSameLevel = shuffle(
        defenderLeaders.filter(
          (defenderLeader) =>
            defenderLeader.leaderLevel === rowLeaderLevel &&
            defenderLeader.soliderNum > 0
        )
      );
      if (shuffleDefenderLeadersInSameLevel.length === 0) {
        continue;
      }
      defender = shuffleDefenderLeadersInSameLevel[0];
      break;
    }
    return defender;
  };
  const addLeaderByButton = (index, side) => {
    Array.from(Array(1000)).forEach((x, i) => {
      dispatch(
        addLeader({
          leaderLevel: index + 1,
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
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2">
        <div>
          <button
            className="h-12 w-12 bg-gray-300 flex items-center justify-center rounded border border-gray-300 hover:bg-white hover:ease-in-out duration-300"
            onClick={() => fight()}
          >
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
                    "md:p-4 p-2 grid grid-cols-3 md:gap-4 gap-2 md:grid-cols-5 2xl:grid-cols-10 self-start rounded h-full content-start " +
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
                          <div className="text-xs md:text-sm ">
                            <span className="truncate">{leader.name}</span>
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
                      onClick={() => addLeaderByButton(index, side)}
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
