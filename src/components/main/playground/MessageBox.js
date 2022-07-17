//react
import { memo } from "react";

//redux
import { useSelector } from "react-redux";

//local
import useMessage from "../hook/useMessage";

const MessageBox = () => {
  const report = useSelector((state) => state.reportReducer);
  const message = useMessage();
  return (
    <div className="hover:opacity-100 md:opacity-50 h-24 w-full overflow-y-auto border border-gray-300 rounded-lg text-xs transition-opacity duration-300">
      <div className="space-y-1">
        {Object.keys(message).map((key, index) => {
          return (
            <div key={index} className="space-y-1">
              <div className="font-bold bg-gray-300/50 text-center sticky top-0 backdrop-blur-sm">
                回合{key}
              </div>
              {message[key].map((row, index2) => {
                return row.type === "attack" ? (
                  <div
                    key={index2}
                    className="md:px-2 px-1"
                    id={"MessageBox" + row.id}
                  >
                    <span
                      className={
                        row.attackerAfter.side === "my"
                          ? "text-blue-600"
                          : "text-red-600"
                      }
                    >
                      {report.sideName[row.attackerAfter.side]}
                    </span>{" "}
                    {row.attackerAfter.name} 擊退{" "}
                    <span
                      className={
                        row.defenderAfter.side === "my"
                          ? "text-blue-600"
                          : "text-red-600"
                      }
                    >
                      {report.sideName[row.defenderAfter.side]}
                    </span>{" "}
                    {row.defenderAfter.name}{" "}
                    {row.defenderBefore.soliderNum -
                      row.defenderAfter.soliderNum}
                    士兵 ( {row.defenderBefore.soliderNum}
                    {"->"}
                    {row.defenderAfter.soliderNum} )
                  </div>
                ) : null;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(MessageBox);
