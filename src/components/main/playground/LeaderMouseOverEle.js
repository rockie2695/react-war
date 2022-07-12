//react
import { memo, useState, useEffect } from "react";

//redux
import { useSelector } from "react-redux";

//react responsive
import MediaQuery from "react-responsive";

const LeaderMouseOverEle = ({ mouseCoords }) => {
  //redux
  const mouseOverLeader = useSelector(
    (state) => state.selectedLeaderReducer.mouseOverLeader
  );
  const leaders = useSelector((state) => state.leaderReducer.real);
  const sideName = useSelector((state) => state.sideNameReducer);

  //state
  const [selfMouseOverLeader, setSelfMouseOverLeader] = useState(null);

  useEffect(() => {
    if (mouseOverLeader !== null) {
      setSelfMouseOverLeader(
        leaders[mouseOverLeader.leaderLevel].filter((row) => {
          return row.id === mouseOverLeader.id;
        })[0]
      );
    } else {
      setSelfMouseOverLeader(null);
    }
  }, [mouseOverLeader, leaders]);

  return (
    selfMouseOverLeader !== null && (
      <MediaQuery minWidth={768}>
        <div
          className="w-48 bg-white border border-gray-400 rounded py-1 px-2 break-words text-sm"
          style={{
            position: "absolute",
            top: mouseCoords.y,
            left: mouseCoords.x,
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{selfMouseOverLeader.name}</td>
              </tr>
              <tr>
                <td>soliderNum</td>
                <td>:</td>
                <td>
                  {selfMouseOverLeader.soliderNum} /{" "}
                  {selfMouseOverLeader.maxSoliderNum} (
                  {Math.round(
                    (selfMouseOverLeader.soliderNum /
                      selfMouseOverLeader.maxSoliderNum) *
                      100
                  )}
                  %)
                </td>
              </tr>
              <tr>
                <td>LeaderPower</td>
                <td>:</td>
                <td>{selfMouseOverLeader.leaderPower}</td>
              </tr>
              <tr>
                <td>Side</td>
                <td>:</td>
                <td>{sideName[selfMouseOverLeader.side]}</td>
              </tr>
              <tr>
                <td>LeaderLevel</td>
                <td>:</td>
                <td>{selfMouseOverLeader.leaderLevel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </MediaQuery>
    )
  );
};
export default memo(LeaderMouseOverEle);
