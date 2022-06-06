//react
import { memo } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setSideName } from "../../../features/side/sideNameSlice";
import FightControlEle from "./FightControlEle";

//react responsive
import MediaQuery from "react-responsive";

const SideName = () => {
  console.log("render SideName");

  //redux
  const sideName = useSelector((state) => state.sideNameReducer);
  const dispatch = useDispatch();

  return (
    <div className="grid md:grid-cols-11 grid-cols-2 md:gap-4 gap-2">
      <div className="md:col-span-4 h-full flex items-center">
        <input
          className="w-full h-10 border border-gray-300 text-center p-1 text-blue-600 font-bold text-lg"
          value={sideName.my}
          onChange={(e) =>
            dispatch(setSideName({ key: "my", value: e.target.value }))
          }
        />
      </div>

      <MediaQuery minWidth={768}>
        <div className="col-span-3">
          <FightControlEle />
        </div>
      </MediaQuery>

      <div className="md:col-span-4 h-full flex items-center">
        <input
          className="w-full h-10 border border-gray-300 text-center p-1 text-red-600 font-bold text-lg"
          value={sideName.enemy}
          onChange={(e) =>
            dispatch(setSideName({ key: "enemy", value: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default memo(SideName);
