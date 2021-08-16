import React from "react";
import { Redirect } from "react-router-dom";

const RouteComponent = ({ route, isAuthenticated, ...rest }) => {
  const { auth, component: Component, authPage = "/login" } = route;
  const show = !auth || isAuthenticated;

  return show ? <Component {...rest} /> : <Redirect to={authPage} />;
};

export default RouteComponent;
