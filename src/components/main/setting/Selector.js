//redux
import { useSelector, useDispatch } from "react-redux";
import { changeSetting } from "../../../features/setting/settingSlice";

//className
let classNames = require("classnames");

export default function Selector({ option, name }) {

  //redux
  const dispatch = useDispatch();

  const handleSelectorChange = (event) => {
    console.log(event.target.value, name);
    dispatch(
      changeSetting({
        key: name,
        value: event.target.value,
      })
    );
  };
  return (
    <>
      {option.length < 4 &&
        option.map((row, index) => (
          <RowSelector
            row={row}
            index={index}
            key={index}
            name={name}
            onClick={handleSelectorChange}
          />
        ))}
      {option.length >= 4 && (
        <select
          onChange={handleSelectorChange}
          name={name}
          className="rounded p-1 text-center flex-1"
        >
          {option.map((row, index) => (
            <option value={row.value} key={index}>
              {row.display}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

const RowSelector = ({ row, index, name, onClick }) => {
  //redux
  const setting = useSelector((state) => state.settingReducer);

  let btnClass = classNames({
    "flex-1 hover:bg-zinc-400 hover:text-zinc-700 rounded p-1 hover:ease-in-out duration-300": true,
    "bg-white font-bold": setting[name].value === row.value,
    "bg-black text-zinc-300": setting[name].value !== row.value,
  });

  return (
    <button
      key={index}
      className={btnClass}
      onClick={onClick}
      name={name}
      value={row.value}
    >
      {row.display}
    </button>
  );
};