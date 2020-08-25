import React from "react";
import Home from "../Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const AdminRoute = ({
  role,
  handleError,
  component: Component,
  ...options
}) => {
  //   const finalComponent = role == "Admin" ? component : Home;

  return (
    <Route
      {...options}
      render={() =>
        role === "ADMIN" ? (
          <Component handleError={handleError} />
        ) : (
          <Redirect to="/dashboard/home" />
        )
      }
    />
  );
};

export default AdminRoute;
