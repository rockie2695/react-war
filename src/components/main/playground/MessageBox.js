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
    <div className="h-20 w-full overflow-y-auto p-1 border border-gray-300 rounded-lg">
      {Object.keys(message).map((key, index) => {
        return <div key={index}>{key}</div>;
      })}
    </div>
  );
};
export default memo(MessageBox);
