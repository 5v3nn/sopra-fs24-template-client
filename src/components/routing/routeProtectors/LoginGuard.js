import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../useAuth";

/**
 *
 * Another way to export directly your functional component is to write 'export const'
 * instead of 'export default' at the end of the file.
 */
export const LoginGuard = () => {
  const isAuth = useAuth();
  console.debug(
    "login guard token",
    localStorage.getItem("token"),
    localStorage.getItem("token") === "null"
  );
  // if not logged in
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "null" ||
    !isAuth
  ) {
    return <Outlet />;
  }

  return <Navigate to="/game" replace />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};
