//react
import { memo, useEffect, useState } from "react";

//local
import useMessage from "../../../hook/useMessage";

//redux
import { useSelector } from "react-redux";

const AttackOrderList = () => {
  const setting = useSelector((state) => state.settingReducer);
  const message = useMessage();
  return (
    <div className="flex overflow-x-auto space-x-1">
      {Object.keys(message).map((key, index) => {
        return (
          <div
            className="border-r pr-1"
            style={{ wordBreak: "keep-all" }}
            key={index}
          >
            回合{key}
            <div className="flex space-x-1">
              {message[key].map((row, index2) => {
                return (
                  <div
                    className={
                      "text-xs md:text-sm " +
                      (row.attackerAfter.side === "my"
                        ? "text-blue-600"
                        : "text-red-600")
                    }
                    id={"AttackOrderList" + row.id}
                    style={{
                      wordBreak: "keep-all",
                      transitionDuration:
                        setting.eachFightPlayTime.value * 1000 * 0.3 + "ms",
                    }}
                    key={index2}
                  >
                    {row.attackerAfter.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(AttackOrderList);
