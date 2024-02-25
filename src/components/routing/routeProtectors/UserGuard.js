import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api";

/**
 *
 * Another way to export directly your functional component is to write 'export const'
 * instead of 'export default' at the end of the file.
 */
export const UserGuard = async () => {
  // // auth user with token
  // const response = await api.get("/users/auth", {
  //   params: { token: localStorage.getItem("token") },
  // });
  //
  // if (response.statusCode === 200) {
  //   return <Outlet />;
  // }

  return <Navigate to="/game" replace />;
};

UserGuard.propTypes = {
  children: PropTypes.node,
};
