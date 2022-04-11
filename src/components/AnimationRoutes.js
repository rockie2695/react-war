import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../css/AnimationRoutes.css";

const Playground = lazy(() => import("../route/Playground"));
const Setting = lazy(() => import("../route/Setting"));
/**
 * difficult to fix react transition group bug
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
 */
/*
lazyload and TransitionGroup can't match together
*/
export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <main className="relative flex-1 w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={500}
          >
            <Routes location={location}>
              <Route path="/playground" element={<Playground />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="*" element={<Navigate to="/playground" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </main>
  );
}
