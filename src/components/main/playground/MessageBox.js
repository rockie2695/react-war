//react
import { memo, useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
const MessageBox = () => {
  const report = useSelector((state) => state.reportReducer);
  const [message, setMessage] = useState({});
  useEffect(() => {
    let selfMessage = {};
    report.cloneHistory.forEach((row) => {
      if (selfMessage.hasOwnProperty(row.round)) {
        selfMessage[row.round].push(row);
      } else {
        selfMessage[row.round] = [row];
      }
    });
    console.log(selfMessage);
    setMessage(selfMessage);
  }, [report.cloneHistory]);
  return (
    <div className="hover:opacity-100 md:opacity-50 h-20 w-full overflow-y-auto border border-gray-300 rounded-lg text-xs transition-opacity duration-300">
      <div className="m-1 space-y-1">
        {Object.keys(message).map((key, index) => {
          return (
            <div key={index} className="space-y-1">
              <div className="font-bold bg-gray-300/50 text-center sticky top-0 backdrop-blur-sm rounded">
                回合{key}
              </div>
              {message[key].map((row, index2) => {
                return row.type === "attack" ? (
                  <div key={index2} className="md:px-2 px-1">
                    {row.attackerAfter.name} 擊退 {row.defenderAfter.name}{" "}
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
