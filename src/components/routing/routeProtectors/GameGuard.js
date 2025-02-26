import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { api, updateUserStatus, handleError } from "helpers/api";
import { useAuth } from "../../useAuth";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * <Outlet /> is rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const GameGuard = () => {
  const isAuth = useAuth();

  if (isAuth === null) {
    // waiting..
    return null;
  }

  if (isAuth) {
    updateUserStatus("ONLINE");

    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

GameGuard.propTypes = {
  children: PropTypes.node,
};
