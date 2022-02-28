import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PlayGround from "./route/PlayGround";
import Setting from "./route/Setting";
import React from "react";
import "./css/AnimationRoutes.css";
/**
 * difficult to fix react transition group bug
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
 */
export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <main className="relative">
      <TransitionGroup component={null}>
        <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>
          <Routes location={location}>
            <Route path="/playground" element={<PlayGround />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="*" element={<Navigate to="/playground" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </main>
  );
}
