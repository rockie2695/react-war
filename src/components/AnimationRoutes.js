import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../css/AnimationRoutes.css";

const Playground = lazy(() =>
  import("../components/main/playground/Playground")
);
const Setting = lazy(() => import("../components/main/setting/Setting"));

export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <main className="relative flex-1 w-full bg-zinc-50">
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
