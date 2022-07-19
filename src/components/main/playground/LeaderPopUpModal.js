//react
import { memo, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setClickedLeader } from "../../../reducers/leader/selectedLeaderSlice";
import {
  changeOneRealLeader,
  changeOneRealLeaderLevel,
  deleteOneRealLeader,
} from "../../../reducers/leader/leaderSlice";

//react icons
import { MdClose, MdOutlineDelete } from "react-icons/md"; //close,delete
import { FaRandom } from "react-icons/fa"; //random

//component
import NormalButton from "../NormalButton";
import InputBox from "../InputBox";
import Selector from "../Selector";

//random js
import { randomPeopleName } from "../../../script/random";

//react spring
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
  const setting = useSelector((state) => state.settingReducer);
  const leaderLevel = useSelector((state) => state.leaderLevelReducer);

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
    to: { backdropFilter: "blur(4px)", transform: "translateY(0px)" },
    from: { backdropFilter: "blur(0px)", transform: "translateY(-100%)" },
    config: { duration: 100, delay: 0 },
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
      <div className="md:w-1/2 w-full md:h-1/2 h-full md:p-4 p-2 border border-gray-500/50 bg-gray-200/50 shadow-md overflow-y-auto md:space-y-4 space-y-2 rounded-lg">
        <div className="w-full flex">
          <div className="text-left flex-1">
            <NormalButton
              className="h-12 w-12 text-lg"
              onClick={() => {
                dispatch(deleteOneRealLeader(clickedLeader));
                dispatch(setClickedLeader(null));
              }}
              aria-label="delete"
            >
              <MdOutlineDelete />
            </NormalButton>
          </div>
          <div className="text-right flex-1">
            <NormalButton
              className="h-12 w-12 text-lg"
              onClick={() => dispatch(setClickedLeader(null))}
              aria-label="close"
            >
              <MdClose />
            </NormalButton>
          </div>
        </div>

        <div className="grid grid-cols-7 md:gap-y-4 gap-y-2">
          <div className="col-span-2 self-center">Name</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4 flex">
            <InputBox
              className="rounded-r-none w-full h-8"
              objInReducer={clickedLeaderInputLimit.name}
              inputValue={selfClickedLeader.name}
              minLength={selfClickedLeader.name}
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
            <NormalButton
              className="h-8 w-11"
              aria-label="random left side name"
              roundedClassName="rounded-l-none"
              onClick={() => {
                dispatch(
                  changeOneRealLeader({
                    id: selfClickedLeader.id,
                    leaderLevel: selfClickedLeader.leaderLevel,
                    name: randomPeopleName().name,
                  })
                );
              }}
            >
              <FaRandom />
            </NormalButton>
          </div>

          <div className="col-span-2 self-center">soliderNum</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4 space-y-2">
            <div className="flex">
              <div className="basis-2/5">
                <InputBox
                  className="rounded-r-none w-full h-8"
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
                  className="rounded-l-none w-full h-8"
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
            <div className="flex">
              <InputBox
                className="rounded-r-none w-full h-8"
                objInReducer={clickedLeaderInputLimit.soliderNumPerc}
                inputValue={Math.round(
                  (selfClickedLeader.soliderNum /
                    selfClickedLeader.maxSoliderNum) *
                    100
                )}
                onChangeFunc={(name, value) => {
                  dispatch(
                    changeOneRealLeader({
                      id: selfClickedLeader.id,
                      leaderLevel: selfClickedLeader.leaderLevel,
                      soliderNum: Math.round(
                        (value / 100) * selfClickedLeader.maxSoliderNum
                      ),
                    })
                  );
                }}
              />
              <div className="p-1 bg-white h-8">%</div>
            </div>
          </div>

          <div className="col-span-2 self-center">LeaderPower</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4">
            <InputBox
              className="rounded-r-none w-full h-8"
              objInReducer={clickedLeaderInputLimit.leaderPower}
              inputValue={selfClickedLeader.leaderPower}
              maxValue={setting.leaderPowerUpper.value}
              minValue={setting.leaderPowerLower.value}
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

          <div className="col-span-2 self-center">Side</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4 flex h-8">
            <Selector
              option={[
                { display: sideName["my"], value: "my" },
                { display: sideName["enemy"], value: "enemy" },
              ]}
              name="side"
              onChangeFunc={(name, value) => {
                console.log(name, value);
                dispatch(
                  changeOneRealLeader({
                    id: selfClickedLeader.id,
                    leaderLevel: selfClickedLeader.leaderLevel,
                    [name]: value,
                  })
                );
              }}
              selectedValue={selfClickedLeader.side}
            />
          </div>

          <div className="col-span-2 self-center">LeaderLevel</div>
          <div className="text-center self-center">:</div>
          <div className="col-span-4 flex h-8">
            <Selector
              option={[...Array(leaderLevel).keys()].map((rowLeaderLevel) => {
                return {
                  display: rowLeaderLevel + 1,
                  value: rowLeaderLevel + 1,
                };
              })}
              name="leaderLevel"
              onChangeFunc={(name, value) => {
                console.log(name, value);
                dispatch(
                  changeOneRealLeaderLevel({
                    id: selfClickedLeader.id,
                    oldLeaderLevel: selfClickedLeader.leaderLevel,
                    newLeaderLevel: parseInt(value),
                  })
                );
                dispatch(
                  setClickedLeader({
                    ...clickedLeader,
                    leaderLevel: parseInt(value),
                  })
                );
              }}
              selectedValue={selfClickedLeader.leaderLevel}
            />
          </div>
        </div>
      </div>
    </animated.div>
  ) : null;
};
export default memo(LeaderPopUpModal);
