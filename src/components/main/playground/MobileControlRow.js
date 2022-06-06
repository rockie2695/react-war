//react
import { memo } from "react";

//redux
import FightControlEle from "./FightControlEle";
import RoundEle from "./RoundEle";

const MobileControlRow = () => {
  console.log("render MobileControlRow");

  return (
    <div className="grid grid-cols-2 gap-2">
      <FightControlEle />
      <RoundEle />
    </div>
  );
};
export default memo(MobileControlRow);
