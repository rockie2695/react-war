//react
import { memo, useCallback, useEffect, useState } from "react";

//redux
import {
  setReport,
  setStop,
  setRound,
} from "../../../features/report/reportSlice";
import {
  setCloneLeader,
  changeOneRealLeader,
  setLeader,
} from "../../../features/leader/leaderSlice";
import { useSelector, useDispatch } from "react-redux";

//react icons
import {
  MdPlayArrow,
  MdOutlinePause,
  MdReplay,
  MdOutlineArrowBack,
} from "react-icons/md"; //play,pause,replay
import { RiSwordFill } from "react-icons/ri"; //fight

//component
import NormalButton from "../NormalButton";

//script
import { randomInteger, shuffle } from "../../../script/random";

//react router
import { useLocation } from "react-router-dom";

const FightControlEle = () => {
  console.log("render FightControlRow");

  //redux
  const leaders = useSelector((state) => state.leaderReducer.real);
  const cloneLeaders = useSelector((state) => state.leaderReducer.clone);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);
  const setting = useSelector((state) => state.settingReducer);
  const sideName = useSelector((state) => state.sideNameReducer);
  const report = useSelector((state) => state.reportReducer);
  const stop = useSelector((state) => state.reportReducer.stop);
  const dispatch = useDispatch();

  //state
  const [fightTimeoutLoop, setFightTimeoutLoop] = useState(null);
  const [mySideTopestLeader, setMySideTopestLeader] = useState([]);
  const [enemySideTopestLeader, setEnemySideTopestLeader] = useState([]);

  //react router
  const location = useLocation();

  useEffect(() => {
    setMySideTopestLeader(leaders[1].filter((row) => row.side === "my"));
    setEnemySideTopestLeader(leaders[1].filter((row) => row.side === "enemy"));
  }, [leaders]);

  const intervalReport = useCallback(
    (reportHistory) => {
      let selfReportHistory = reportHistory;
      //setFightTimeoutLoop(
      let selfFightTimeoutLoop = setTimeout(() => {
        //row
        let showRowReportHistory = selfReportHistory[0];
        console.log(showRowReportHistory);
        dispatch(
          changeOneRealLeader({
            ...showRowReportHistory.attackerAfter,
            borderColor: "blue",
          })
        );
        dispatch(
          changeOneRealLeader({
            ...showRowReportHistory.defenderAfter,
            borderColor: "red",
          })
        );

        //save
        selfReportHistory = selfReportHistory.slice(1);
        dispatch(setReport({ history: selfReportHistory }));
        dispatch(setRound(showRowReportHistory.round));
        //remove border
        setTimeout(() => {
          dispatch(
            changeOneRealLeader({
              id: showRowReportHistory.attackerAfter.id,
              leaderLevel: showRowReportHistory.attackerAfter.leaderLevel,
              borderColor: null,
            })
          );
          dispatch(
            changeOneRealLeader({
              id: showRowReportHistory.defenderAfter.id,
              leaderLevel: showRowReportHistory.defenderAfter.leaderLevel,
              borderColor: null,
            })
          );

          //clear
          clearInterval(selfFightTimeoutLoop);
          setFightTimeoutLoop(null);
        }, setting.eachFightPlayTime.value * 1000 * 0.7);
      }, setting.eachFightPlayTime.value * 1000);
      setFightTimeoutLoop(selfFightTimeoutLoop);
    },
    [dispatch, setting.eachFightPlayTime.value]
  );

  useEffect(() => {
    if (
      fightTimeoutLoop !== null &&
      (location.pathname !== "/playground" || stop === true)
    ) {
      dispatch(setStop(true));
      clearInterval(fightTimeoutLoop);
      setFightTimeoutLoop(null);
    } else if (
      report.history.length > 0 &&
      fightTimeoutLoop === null &&
      location.pathname === "/playground" &&
      stop === false
    ) {
      intervalReport(report.history);
    }
  }, [
    report.history,
    fightTimeoutLoop,
    intervalReport,
    location.pathname,
    stop,
    dispatch,
  ]);

  const calcFight = useCallback(
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

      if (selfDefender.soliderNum < 0) {
        selfDefender.soliderNum = 0;
      }

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
        [attacker, defender] = calcFight(attacker, defender);
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
    [calcFight, findDefender]
  );

  const fight = useCallback(() => {
    //var
    let noDefender = false,
      report = { history: [], sideName: sideName },
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
    while (round <= 100) {
      round++;
      //loop each level
      for (const rowLevel of level) {
        //make first round,only the lowest level can attack,second round,only the second lowest and lowest level can attack,and so on
        if (round >= level.indexOf(rowLevel) + 1) {
          //check first row defender soliderNum or attacker soliderNum is 0,then break
          let mySideFirstRowSoliderNum = processLeaders
            .filter(
              (leader) => leader.leaderLevel === 1 && leader.side === "my"
            )
            .reduce((a, b) => a + b.soliderNum, 0);
          let enemySideFirstRowSoliderNum = processLeaders
            .filter(
              (leader) => leader.leaderLevel === 1 && leader.side === "enemy"
            )
            .reduce((a, b) => a + b.soliderNum, 0);

          if (
            mySideFirstRowSoliderNum === 0 ||
            enemySideFirstRowSoliderNum === 0
          ) {
            break;
          }
          //fight in each level
          const [subNoDefender, subReport] = fightInEachLevel(
            rowLevel,
            processLeaders,
            round
          );

          noDefender = subNoDefender;
          report.history = [...report.history, ...subReport];
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
    report.cloneHistory = report.history;
    console.log("fight result:", processLeaders, report);
    dispatch(setCloneLeader(leaders));
    dispatch(setReport(report));
  }, [fightInEachLevel, leaderLevel, leaders, dispatch, sideName]);

  return (
    <div className="text-center md:space-x-4 space-x-2 h-12">
      {mySideTopestLeader.length > 0 &&
        enemySideTopestLeader.length > 0 &&
        report.history.length === 0 &&
        report.cloneHistory.length === 0 && (
          <NormalButton
            className="h-12 w-12 text-lg"
            onClick={() => fight()}
            aria-label="fight"
          >
            <RiSwordFill />
          </NormalButton>
        )}

      {report.history.length > 0 && (
        <>
          {stop && (
            <NormalButton
              className="h-12 w-12 text-lg"
              aria-label="play"
              onClick={() => dispatch(setStop(false))}
            >
              <MdPlayArrow />
            </NormalButton>
          )}
          {!stop && (
            <NormalButton
              className="h-12 w-12 text-lg"
              aria-label="pause"
              onClick={() => dispatch(setStop(true))}
            >
              <MdOutlinePause />
            </NormalButton>
          )}
        </>
      )}

      {report.history.length === 0 && report.cloneHistory.length !== 0 && (
        <>
          <NormalButton
            className="h-12 w-12 text-lg"
            aria-label="replay"
            onClick={() => {
              dispatch(setStop(true));
              dispatch(setReport({ history: report.cloneHistory }));
              dispatch(setLeader(cloneLeaders));
            }}
          >
            <MdReplay />
          </NormalButton>
          <NormalButton
            className="h-12 w-12 text-lg"
            aria-label="back"
            onClick={() => {
              dispatch(setReport({ history: [], cloneHistory: [] }));
              dispatch(setLeader(cloneLeaders));
              dispatch(setStop(false));
            }}
          >
            <MdOutlineArrowBack />
          </NormalButton>
        </>
      )}
    </div>
  );
};

export default memo(FightControlEle);
