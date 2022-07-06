import Header from "../Header";

//redux
import { useSelector, useDispatch } from "react-redux";
import { changeSetting } from "../../../features/setting/settingSlice";

//component
import Selector from "./Selector";
import InputBox from "../InputBox";

export default function Setting() {
  console.log("render Setting");

  //redux
  const setting = useSelector((state) => state.settingReducer);
  const dispatch = useDispatch();
  
  return (
    <div className="w-full min-h-full">
      <Header title="Setting" />
      <div className="main-content md:p-4 p-2 grid grid-cols-4">
        <div className="md:col-span-3 col-span-4 md:space-y-4 space-y-2">

          <div>
            <h2 className="title text-lg font-bold">war table board</h2>
            <div className="content md:py-2 py-2 bg-gray-300 rounded-lg">
              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors min-h-[2.5rem] items-center">
                <div className="flex-1">
                  <label htmlFor="numAddPeople">增加leader數:</label>
                </div>
                <div className="flex-1 flex items-center">
                  <InputBox
                    className="flex-1"
                    objInReducer={setting.numAddPeople}
                    onChangeFunc={(name, value) => {
                      dispatch(
                        changeSetting({
                          key: name,
                          value: value,
                        })
                      );
                    }}
                  />
                </div>
              </div>

              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors min-h-[2.5rem] items-center">
                <div className="flex-1">
                  <label htmlFor="eachFightPlayTime">
                    each fight play time:
                  </label>
                </div>
                <div className="flex-1 flex items-center">
                  <InputBox
                    className="flex-1 rounded-r-none"
                    objInReducer={setting.eachFightPlayTime}
                    onChangeFunc={(name, value) => {
                      dispatch(
                        changeSetting({
                          key: name,
                          value: value,
                        })
                      );
                    }}
                  />
                  <div className="p-1 bg-white rounded-r">s</div>
                </div>
              </div>

              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors min-h-[2.5rem] items-center">
                <div className="flex-1">
                  <label htmlFor="numAddPeople">show 百分比 or 士兵數值:</label>
                </div>
                <div className="flex-1 flex items-center">
                  <Selector
                    option={[
                      { display: "百分比", value: "percentage" },
                      { display: "士兵數值", value: "soliderNum" },
                    ]}
                    name="showSoliderNumOrPerc"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="title text-lg font-bold">fight calculate</h2>
            <div className="content md:py-2 py-2 bg-gray-300 rounded-lg">
              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors min-h-[2.5rem] items-center">
                <div className="flex-1">
                  <label htmlFor="attackAndSoliderRatio">
                    攻擊力與士兵比例:
                  </label>
                </div>
                <div className="flex-1 flex items-center">
                  <InputBox
                    className="flex-1 rounded-r-none"
                    objInReducer={setting.attackAndSoliderRatio}
                    onChangeFunc={(name, value) => {
                      dispatch(
                        changeSetting({
                          key: name,
                          value: value,
                        })
                      );
                    }}
                  />
                  <div className="p-1 bg-white rounded-r">%</div>
                </div>
              </div>

              <div className="hover:border-gray-500 border-2 border-gray-300 md:p-2 p-2 flex rounded transition-colors min-h-[2.5rem] items-center">
                <div className="flex-1">
                  <span>攻擊隨機上下浮動值:</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="basis-2/5 flex">
                    <InputBox
                      className="flex-1 rounded-r-none"
                      objInReducer={setting.attackRandomFlowLower}
                      onChangeFunc={(name, value) => {
                        dispatch(
                          changeSetting({
                            key: name,
                            value: value,
                          })
                        );
                      }}
                    />
                    <div className="p-1 bg-white rounded-r">%</div>
                  </div>
                  <span className="basis-1/5 text-center">&nbsp;-&nbsp;</span>
                  <div className="basis-2/5 flex">
                    <InputBox
                      className="flex-1 rounded-r-none"
                      objInReducer={setting.attackRandomFlowUpper}
                      onChangeFunc={(name, value) => {
                        dispatch(
                          changeSetting({
                            key: name,
                            value: value,
                          })
                        );
                      }}
                    />
                    <span className="p-1 bg-white rounded-r">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 md:block hidden">test</div>
      </div>
    </div>
  );
}
