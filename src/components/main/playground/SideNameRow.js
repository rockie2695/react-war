//redux
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSideName } from "../../../features/side/sideNameSlice";

const SideName = () => {
  console.log("render SideName");

  //redux
  const sideName = useSelector((state) => state.sideNameReducer.value);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 md:gap-4 gap-2">
      <div className="h-10">
        <input
          className="w-full h-full border border-gray-300 text-center p-1"
          value={sideName.my}
          onChange={(e) =>
            dispatch(setSideName({ key: "my", value: e.target.value }))
          }
        />
      </div>
      <div>
        <input
          className="w-full h-full border border-gray-300 text-center p-1"
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
