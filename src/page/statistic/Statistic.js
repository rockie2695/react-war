import { useEffect, useState } from "react";
import Header from "../../components/main/Header";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryGroup,
} from "victory";
//local
import useMessage from "../../hook/useMessage";
export default function Statistic() {
  const [roundDamage, setRoundDamage] = useState([]);
  const message = useMessage();
  useEffect(() => {
    let selfRoundDamage = [];
    Object.keys(message).map((eachRound, index) => {
      let my = 0;
      let enemy = 0;
      message[eachRound].forEach((value, index2) => {
        if (value.attackerAfter.side === "my") {
          my +=
            value.defenderBefore.soldierNum - value.defenderAfter.soldierNum;
        }
        if (value.attackerAfter.side === "enemy") {
          enemy +=
            value.defenderBefore.soldierNum - value.defenderAfter.soldierNum;
        }
      });
      selfRoundDamage.push({ round: eachRound, my: my, enemy: enemy });
    });
    setRoundDamage(selfRoundDamage);
    console.log(selfRoundDamage);
  }, [message]);
  return (
    <div className="w-full min-h-full">
      <Header title="Statistic" />
      <div className="main-content md:p-4 p-2 md:space-y-4 space-y-2">
        <h2 className="title text-lg font-bold">round total damage</h2>
        {roundDamage.length > 0 && (
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            height={250}
          >
            <VictoryGroup offset={5}>
              <VictoryStack colorScale={"blue"}>
                <VictoryBar
                  data={roundDamage}
                  animate={{
                    onLoad: { duration: 1000 },
                  }}
                  x="round"
                  y="my"
                />
              </VictoryStack>
              <VictoryStack colorScale={"red"}>
                <VictoryBar
                  data={roundDamage}
                  animate={{
                    onLoad: { duration: 1000 },
                  }}
                  x="round"
                  y="enemy"
                />
              </VictoryStack>
            </VictoryGroup>
            <VictoryAxis dependentAxis tickFormat={(tick) => tick} />
            <VictoryAxis tickFormat={Object.keys(message)} />
          </VictoryChart>
        )}
      </div>
    </div>
  );
}
