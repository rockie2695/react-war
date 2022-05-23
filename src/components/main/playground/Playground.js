import { useCallback } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { MdPlayArrow } from "react-icons/md";

import Header from "../Header";
import { randomInteger, shuffle } from "../../../script/random";
import { setReport } from "../../../features/report/reportSlice";
import TableRow from "./TableRow";

import { Virtuoso } from "react-virtuoso";

import NormalButton from "../NormalButton";

export default function Playground() {
  console.log("render Playground");
  //redux
  const leaders = useSelector((state) => state.leaderReducer.value);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer.value);
  const setting = useSelector((state) => state.settingReducer.value);
  const dispatch = useDispatch();

  //function
  const calFight = useCallback(
    (attacker, defender) => {
      let selfDefender = JSON.parse(JSON.stringify(defender));
      const attackerLeaderPowerTimes = 1 + (attacker.leaderPower / 100) * 5;
      const attackRandomFlowUpper = setting.attackRandomFlowUpper.value / 100;
      const attackRandomFlowLower = setting.attackRandomFlowLower.value / 100;
      const attackAndSoliderRatio = setting.attackAndSoliderRatio.value / 100;
      const attackRandomNum = randomInteger(
        parseInt(
          attacker.soliderNum *
            attackAndSoliderRatio *
            attackRandomFlowLower *
            attackerLeaderPowerTimes
        ),
        parseInt(
          attacker.soliderNum *
            attackAndSoliderRatio *
            attackRandomFlowUpper *
            attackerLeaderPowerTimes
        )
      );
      selfDefender.soliderNum -= Math.max(
        attackRandomNum,
        attacker.leaderPower
      );

      return [attacker, selfDefender];
    },
    [
      setting.attackRandomFlowUpper,
      setting.attackRandomFlowLower,
      setting.attackAndSoliderRatio,
    ]
  );

  const findDefender = useCallback(
    (rowLeaderLevel = 1, attackerSide = "my", processLeaders = []) => {
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
    },
    []
  );

  const fightInEachLevel = useCallback(
    (rowLeaderLevel, processLeaders, round) => {
      let report = [],
        noDefender = false;
      let shuffleLeaderInSameLevel = shuffle(
        processLeaders.filter((leader) => leader.leaderLevel === rowLeaderLevel)
      );
      //loop each leader in same level
      for (const [index, row] of shuffleLeaderInSameLevel.entries()) {
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
        report.push({
          round: round,
          attackerId: attacker.id,
          defenderId: defender.id,
          attackerBefore: processLeaders[needChangeAttackerIndex],
          defenderBefore: processLeaders[needChangeDefenderIndex],
          attackerAfter: attacker,
          defenderAfter: defender,
        });
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
    },
    [calFight, findDefender]
  );

  const fight = useCallback(() => {
    //var
    let noDefender = false,
      report = [],
      round = 0;

    //get leaders
    let processLeaders = [];
    for (let [key, value] of Object.entries(leaders)) {
      processLeaders = [...processLeaders, ...value];
    }
    //level generate [5,4,3,2,1] by leaderLevel
    let level = [...Array(leaderLevel).keys()]
      .map((rowLeaderLevel) => rowLeaderLevel + 1)
      .reverse();
    //fight until other side leaders are dead
    while (true) {
      round++;
      //loop each level
      for (const rowLevel of level) {
        //make first round,only the lowest level can attack,second round,only the second lowest and lowest level can attack,and so on
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
        if (round < level.indexOf(rowLevel) + 1) {
          break;
        }
      }

      if (noDefender) {
        break;
      }
    }

    console.log(processLeaders, report);
    dispatch(setReport(report));
  }, [fightInEachLevel, leaderLevel, leaders]);

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <div>
          <NormalButton
            className="h-12 w-12"
            onClick={() => fight()}
            aria-label="fight"
          >
            <MdPlayArrow />
          </NormalButton>
        </div>
        <h2>war table</h2>
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
}
