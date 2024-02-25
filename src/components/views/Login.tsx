import React, { useContext, useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import FormField from "../ui/FormField";
import { NameContext } from "../../App";
import RenderError from "../ui/RenderError";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  const { showName, setShowName } = useContext(NameContext);

  const [loginError, setLoginError] = useState<string>("");

  const doLogin = async () => {
    try {
      console.log(
        "make request to auth with username",
        username,
        "password",
        password
      );

      const authResp = await api.post(
        "/users/auth",
        JSON.stringify({ username, password })
      );
      console.debug("auth respond with username password: ", authResp);
      localStorage.setItem("token", authResp.data.token);

      setLoginError("");

      // store name set
      setShowName(username);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      console.log("login successful, route to /game");
      navigate("/game");
    } catch (error) {
      console.log(
        `Something went wrong during the login: \n${handleError(error)}`
      );
      // console.log(error);
      setLoginError("Error: " + error.response.data.message);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
            inputType="text"
          />
          {/*<FormField*/}
          {/*  label="Name"*/}
          {/*  value={name}*/}
          {/*  onChange={(un: string) => setName(un)}*/}
          {/*  inputType="text"*/}
          {/*/>*/}
          <FormField
            label="Password"
            value={password}
            onChange={(p) => setPassword(p)}
            inputType="password"
          />
          <div className="login">
            <RenderError err={loginError !== ""} text={loginError} />
          </div>
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              // disabled={!username || !name}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>

          <div className="login button-container">
            <Button width="100%" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */

export default Login;
