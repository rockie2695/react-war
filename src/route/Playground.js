import { useEffect, useState } from "react";
import Header from "../components/main/Header";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";

export default function Playground() {
  const [percentage, setPercentage] = useState(100); //for testing
  const leader = useSelector((state) => state.leaderReducer.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(leader);
  }, [leader]);

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <div className="main-content p-4">
        <h2>war table</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <button className="w-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded">
              add higher level
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 2xl:grid-cols-10">
            <div>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
              <button className="p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded h-full">
                add button
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 2xl:grid-cols-10">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 2xl:grid-cols-10">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />

            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />

            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 2xl:grid-cols-10">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
          <div className="col-span-2">
            <button className="w-full p-1 bg-gray-300 border border-gray-300 hover:bg-white hover:ease-in-out duration-300 rounded">
              add lower level
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
