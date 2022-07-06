//react
import { memo, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setClickedLeader } from "../../../features/leader/selectedLeaderSlice";

//react icons
import { MdClose } from "react-icons/md"; //close

//component
import NormalButton from "../NormalButton";
import InputBox from "../InputBox";

const PopUpModal = () => {
  //redux
  const dispatch = useDispatch();
  const clickedLeader = useSelector(
    (state) => state.selectedLeaderReducer.clickedLeader
  );
  const clickedLeaderInputLimit=useSelector((state)=>state.selectedLeaderReducer.clickedLeaderInputLimit)
  const leaders = useSelector((state) => state.leaderReducer.real);
  const sideName = useSelector((state) => state.sideNameReducer);

  //state
  const [selfClickedLeader, setSelfClickedLeader] = useState(null);

  useEffect(() => {
    if (clickedLeader !== null) {
      setSelfClickedLeader(
        leaders[clickedLeader.leaderLevel].filter((row) => {
          return row.id === clickedLeader.id;
        })[0]
      );
    } else {
      setSelfClickedLeader(null);
    }
  }, [clickedLeader, leaders]);

  return selfClickedLeader ? (
    <div
      className="bg-white/30 absolute w-full h-full z-[1] top-0 left-0 backdrop-blur-sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        dispatch(setClickedLeader(null));
      }}
    >
      <div className="md:w-1/2 w-full md:h-1/2 h-full p-2 border border-gray-500/50">
        <div className="w-full text-right">
          <NormalButton
            className="h-12 w-12 text-lg"
            onClick={() => dispatch(setClickedLeader(null))}
            aria-label="close"
          >
            <MdClose />
          </NormalButton>
        </div>
        <table className="w-full">
          <tbody>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{selfClickedLeader.name}</td>
            </tr>
            <tr>
              <td>soliderNum</td>
              <td>:</td>
              <td>
                <InputBox
                  className="flex-1 rounded-r-none"
                  objInReducer={clickedLeaderInputLimit.soliderNum}
                  // onChangeFunc={(name, value) => {
                  //   dispatch(
                  //     changeSetting({
                  //       key: name,
                  //       value: value,
                  //     })
                  //   );
                  // }}
                />
                {selfClickedLeader.soliderNum}/{selfClickedLeader.maxSoliderNum}
                (
                {parseInt(
                  (selfClickedLeader.soliderNum /
                    selfClickedLeader.maxSoliderNum) *
                    100
                )}
                %)
              </td>
            </tr>
            <tr>
              <td>LeaderPower</td>
              <td>:</td>
              <td>{selfClickedLeader.leaderPower}</td>
            </tr>
            <tr>
              <td>Side</td>
              <td>:</td>
              <td>{sideName[selfClickedLeader.side]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
};
export default memo(PopUpModal);
