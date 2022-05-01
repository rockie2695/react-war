import React, { useEffect, useState, useRef, useCallback } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { MdPlayArrow } from "react-icons/md";

import Header from "../components/main/Header";
import { randomInteger, shuffle } from "../script/random";
import TableRow from "../components/main/playground/TableRow";

import { Virtuoso } from "react-virtuoso";

export default function Playground() {
  //redux
  const leaders = useSelector((state) => state.leaderReducer.value);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer.value);

  //var

  //function
  const fight = () => {
    //var
    let noDefender = false,
      report = [],
      round = 0;

    //get leaders
    let processLeaders = JSON.parse(JSON.stringify(leaders));

    //fight until other side leaders are dead
    loop1: while (true) {
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

      if (noDefender) {
        console.log(processLeaders, report);
        break;
      }
    }
  };

  const fightInEachLevel = (rowLeaderLevel, processLeaders, round) => {
    let report = [],
      noDefender = false;
    let shuffleLeaderInSameLevel = shuffle(
      processLeaders.filter((leader) => leader.leaderLevel === rowLeaderLevel)
    );
    //2.loop each leader in same level
    loop2: for (let [index, row] of shuffleLeaderInSameLevel.entries()) {
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

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <div>
          <button
            className="h-12 w-12 bg-gray-300 flex items-center justify-center rounded border border-gray-300 hover:bg-white hover:ease-in-out duration-300"
            onClick={() => fight()}
          >
            <MdPlayArrow />
          </button>
        </div>
        <h2>war table</h2>
        <div className="col-span-2">
          <button className="w-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded">
            add higher level
          </button>
        </div>

        <div className="h-[50vh] overflow-hidden">
          {/*[...Array(leaderLevel).keys()]
            .map((rowLeaderLevel) => rowLeaderLevel + 1)
            .map((rowLeaderLevel, index) => (
              <TableRow
                key={index}
                rowLeaderLevel={rowLeaderLevel}
              />
            ))*/}
          <Virtuoso
            className="md:gap-4 gap-2"
            data={[...Array(leaderLevel).keys()].map(
              (rowLeaderLevel) => rowLeaderLevel + 1
            )}
            itemContent={(index, leaderLevel) => (
              <TableRow key={index} className={index>0?"md:mt-4 mt-2":""} rowLeaderLevel={leaderLevel} />
            )}
          />
        </div>

        <div className="col-span-2">
          <button className="w-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded">
            add lower level
          </button>
        </div>
      </div>
    </div>
  );
}
