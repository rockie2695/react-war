//redux
import { useSelector, useDispatch } from "react-redux";

export default function SideName() {
  //redux
  const sideName = useSelector((state) => state.sideNameReducer.value);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 md:gap-4 gap-2">
      <div className="h-10">
        <input
          className="w-full h-full border border-gray-300 text-center p-1"
          value={sideName.my}
        />
      </div>
      <div>
        <input
          className="w-full h-full border border-gray-300 text-center p-1"
          value={sideName.enemy}
        />
      </div>
    </div>
  );
}
