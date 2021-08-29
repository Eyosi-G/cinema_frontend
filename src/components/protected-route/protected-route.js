import React from "react";
import { Route, Redirect } from "react-router-dom";
import config from "../../config";
const ProtectedRoute = ({ children, roles, ...rest }) => {
  const jsonData = localStorage.getItem(config.authStorage);
  const data = JSON.parse(jsonData);
  if (data == null) {
    return <Redirect to="/login" />;
  }
  if (!roles.some((role) => data.user.roles.includes(role))) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
