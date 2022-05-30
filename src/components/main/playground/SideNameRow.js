//react
import { memo } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setSideName } from "../../../features/side/sideNameSlice";
import FightControlRow from "./FightControlRow";

const SideName = () => {
  console.log("render SideName");

  //redux
  const sideName = useSelector((state) => state.sideNameReducer.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="col-span-3 md:hidden block">
        <FightControlRow />
      </div>
      <div className="grid md:grid-cols-11 grid-cols-2 md:gap-4 gap-2">
        <div className="h-10 md:col-span-4">
          <input
            className="w-full h-full border border-gray-300 text-center p-1"
            value={sideName.my}
            onChange={(e) =>
              dispatch(setSideName({ key: "my", value: e.target.value }))
            }
          />
        </div>
        <div className="col-span-3 md:block hidden">
          <FightControlRow />
        </div>
        <div className="h-10 md:col-span-4">
          <input
            className="w-full h-full border border-gray-300 text-center p-1"
            value={sideName.enemy}
            onChange={(e) =>
              dispatch(setSideName({ key: "enemy", value: e.target.value }))
            }
          />
        </div>
      </div>
    </>
  );
};

export default memo(SideName);
