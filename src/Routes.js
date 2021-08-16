import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import RouteComponent from "./RouteComponent";

const Routes = ({ routes }) => {
  // console.log(routes);
  //   redux: checks for auth
  const { isAuthenticated } = useSelector((state) => state.auth);

  const toRouteComponent = (route) => {
    return (
      <Route
        key={route.name}
        path={route.path}
        render={(routeProps) => (
          <RouteComponent
            {...routeProps}
            route={route}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  };
  return (
    <Switch>
      {routes.map(toRouteComponent)}
    </Switch>
  );
};

export default Routes;
