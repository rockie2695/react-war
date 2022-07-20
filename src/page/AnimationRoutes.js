import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "../css/AnimationRoutes.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setStop } from "../reducers/report/reportSlice";

//react responsive
import { useMediaQuery } from "react-responsive";

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

  return (
    <main
      className="relative flex-1 bg-zinc-50"
      style={{ width: isDesktopOrLaptop ? "calc(100% - 129px)" : "100%" }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={location}>
          <Route path="/playground" element={<Playground />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<Navigate to="/playground" />} />
        </Routes>
      </Suspense>
    </main>
  );
}
