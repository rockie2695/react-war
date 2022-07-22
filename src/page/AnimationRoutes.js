import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "../css/AnimationRoutes.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setStop } from "../reducers/report/reportSlice";

//react responsive
import { useMediaQuery } from "react-responsive";

import { useTransition, animated } from "react-spring";

const Playground = lazy(() => import("../page/playground/Playground"));
const Setting = lazy(() => import("../page/setting/Setting"));

export default function AnimationRoutes() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const location = useLocation();
  const stop = useSelector((state) => state.reportReducer.stop);
  const report = useSelector((state) => state.reportReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // runs on location, i.e. route, change
    if (
      location.pathname === "/setting" &&
      stop === false &&
      report.cloneHistory.length > 0
    ) {
      dispatch(setStop(true));
    }
  }, [location, stop, dispatch, report.cloneHistory]);

  const transitions = useTransition(location, {
    from: {
      transform: "translate3d(0%,100%,0)",
      height: "100%",
      position: "absolute",
      width: "100%",
    },
    enter: {
      transform: "translate3d(0%,0%,0)",
      height: "100%",
      position: "absolute",
      width: "100%",
    },
    leave: {
      transform: "translate3d(0%,-100%,0)",
      height: "100%",
      position: "absolute",
      width: "100%",
    },
  });

  return (
    <main
      className="relative flex-1 bg-zinc-50"
      style={{ width: isDesktopOrLaptop ? "calc(100% - 129px)" : "100%" }}
    >
      {transitions((styles, item) => (
        <Suspense fallback={<div>Loading...</div>}>
          <animated.div style={styles}>
            <Routes location={item}>
              <Route path="/playground" element={<Playground />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="*" element={<Navigate to="/playground" />} />
            </Routes>
          </animated.div>
        </Suspense>
      ))}
    </main>
  );
}
