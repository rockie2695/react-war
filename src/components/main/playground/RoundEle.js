//react
import { memo } from "react";

//redux
import { useSelector } from "react-redux";

const RoundEle = () => {
  console.log("render RoundEle");
  const round = useSelector((state) => state.reportReducer.round);

  return (
    <div className="flex items-center justify-center h-full text-lg font-bold">
      R: {round}
    </div>
  );
};

export default memo(RoundEle);
