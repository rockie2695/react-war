import Header from "../components/main/Header";

//redux
import { useSelector, useDispatch } from "react-redux";
import { changeSetting } from "../features/setting/settingSlice";

export default function Setting() {
  //redux
  const setting = useSelector((state) => state.settingReducer.value);
  const dispatch = useDispatch();
  console.log(setting);
  const handleInputChange = (key, value) => {
    if (key === "numAddPeople") {
      if (!isNaN(value) && value >= 1 && value <= 100) {
        dispatch(
          changeSetting({
            key: key,
            value: value,
          })
        );
      }
    }
  };
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
                  <input
                    type="number"
                    id="numAddPeople"
                    name="numAddPeople"
                    className="rounded p-1 text-center flex-1"
                    minLength={1}
                    maxLength={3}
                    min={1}
                    max={100}
                    value={setting.numAddPeople}
                    onChange={(e) =>
                      handleInputChange(e.target.name, parseInt(e.target.value))
                    }
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
                  <span>攻擊隨機上下浮動值:</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="basis-2/5 flex">
                    <input
                      type="number"
                      id="numAddPeople"
                      name="numAddPeople"
                      className="p-1 text-center flex-1 rounded-l"
                      minLength={1}
                      maxLength={3}
                      min={1}
                      max={100}
                      value={setting.numAddPeople}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.name,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <div className="p-1 bg-white rounded-r">
                      %
                    </div>
                  </div>
                  <span className="basis-1/5 text-center">&nbsp;-&nbsp;</span>
                  <div className="basis-2/5 flex">
                    <input
                      type="number"
                      id="numAddPeople"
                      name="numAddPeople"
                      className="p-1 text-center flex-1 rounded-l"
                      minLength={1}
                      maxLength={3}
                      min={1}
                      max={100}
                      value={setting.numAddPeople}
                      onChange={(e) =>
                        handleInputChange(
                          e.target.name,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <span className="p-1 bg-white rounded-r">
                      %
                    </span>
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
