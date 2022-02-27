import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AA from "./route/AA";
import BB from "./route/BB";
import React from "react";
import "./index.css";
/**
 * difficult to fix react transition group bug
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
 */
export default function AnimationRoutes() {
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>
        <Routes location={location}>
          <Route path="/aa" element={<AA />} />
          <Route path="/bb" element={<BB />} />
          <Route path="/" element={<Navigate to="/aa" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
