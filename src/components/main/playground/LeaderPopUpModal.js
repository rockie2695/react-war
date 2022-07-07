//react
import { memo, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setClickedLeader } from "../../../features/leader/selectedLeaderSlice";
import { changeOneRealLeader } from "../../../features/leader/leaderSlice";

//react icons
import { MdClose } from "react-icons/md"; //close

//component
import NormalButton from "../NormalButton";
import InputBox from "../InputBox";

import { useSpring, animated } from "react-spring";

const LeaderPopUpModal = () => {
  //redux
  const dispatch = useDispatch();
  const clickedLeader = useSelector(
    (state) => state.selectedLeaderReducer.clickedLeader
  );
  const clickedLeaderInputLimit = useSelector(
    (state) => state.selectedLeaderReducer.clickedLeaderInputLimit
  );
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

  const props = useSpring({
    to: { backdropFilter: "blur(4px)" },
    from: { backdropFilter: "blur(0px)" },
    config: { duration: 1000 },
  });

  return selfClickedLeader ? (
    <animated.div
      className="absolute w-full h-full z-[1] top-0 left-0 flex justify-center items-center"
      style={props}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        dispatch(setClickedLeader(null));
      }}
    >
      <div className="md:w-1/2 w-full md:h-1/2 h-full p-2 border border-gray-500/50 bg-gray-300/50">
        <div className="w-full text-right">
          <NormalButton
            className="h-12 w-12 text-lg"
            onClick={() => dispatch(setClickedLeader(null))}
            aria-label="close"
          >
            <MdClose />
          </NormalButton>
        </div>

        <div className="grid grid-cols-7 gap-y-2">
          <div className="col-span-2 self-center">Name</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4">{selfClickedLeader.name}</div>

          <div className="col-span-2 self-center">soliderNum</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4">
            <div className="flex">
              <div className="basis-2/5">
                <InputBox
                  className="rounded-r-none w-full"
                  objInReducer={clickedLeaderInputLimit.soliderNum}
                  inputValue={selfClickedLeader.soliderNum}
                  maxValue={selfClickedLeader.maxSoliderNum}
                  onChangeFunc={(name, value) => {
                    dispatch(
                      changeOneRealLeader({
                        id: selfClickedLeader.id,
                        leaderLevel: selfClickedLeader.leaderLevel,
                        [name]: value,
                      })
                    );
                  }}
                />
              </div>

              <div className="p-1 bg-white basis-1/5 text-center">/</div>
              <div className="basis-2/5">
                <InputBox
                  className="rounded-l-none  w-full"
                  objInReducer={clickedLeaderInputLimit.maxSoliderNum}
                  inputValue={selfClickedLeader.maxSoliderNum}
                  onChangeFunc={(name, value) => {
                    dispatch(
                      changeOneRealLeader({
                        id: selfClickedLeader.id,
                        leaderLevel: selfClickedLeader.leaderLevel,
                        [name]: value,
                      })
                    );
                    if (selfClickedLeader.soliderNum > value) {
                      dispatch(
                        changeOneRealLeader({
                          id: selfClickedLeader.id,
                          leaderLevel: selfClickedLeader.leaderLevel,
                          soliderNum: value,
                        })
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div>
              {parseInt(
                (selfClickedLeader.soliderNum /
                  selfClickedLeader.maxSoliderNum) *
                  100
              )}
              %
            </div>
          </div>

          <div className="col-span-2 self-center">LeaderPower</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4">{selfClickedLeader.leaderPower}</div>

          <div className="col-span-2 self-center">Side</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4">{selfClickedLeader.side}</div>
        </div>
      </div>
    </animated.div>
  ) : null;
};
export default memo(LeaderPopUpModal);
