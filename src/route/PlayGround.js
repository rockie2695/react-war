import { useState } from "react";
import Header from "../components/main/Header";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Playground() {
  const [percentage, setPercentage] = useState(100); //for testing

  return (
    <div className="w-full min-h-full">
      <Header title="Playground" />
      <table>
        <tbody>
          <tr>
            <td>123</td>
            <td>456</td>
            <td>123</td>
            <td>456</td>
          </tr>
          <tr>
            <td>789</td>
            <td>321</td>
            <td>123</td>
            <td>456</td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-2 ">
        <div className="flex-1">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <div className="flex-1">test</div>
      </div>
    </div>
  );
}
