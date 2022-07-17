//react
import { useEffect, useState } from "react";
//redux
import { useSelector } from "react-redux";

function useMessage() {
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
    setMessage(selfMessage);
  }, [report.cloneHistory]);
  return message;
}
export default useMessage;
