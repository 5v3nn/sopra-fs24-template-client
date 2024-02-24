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
  const [name, setName] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  const { showName, setShowName } = useContext(NameContext);

  const [loginError, setLoginError] = useState<boolean>(false);

  const doLogin = async () => {
    try {
      // const requestBody = JSON.stringify({ username, password });
      // const requestBody = JSON.stringify({ username, name });
      // const response = await api.post("/users", requestBody);

      // todo password
      console.log(
        "make request to auth with username",
        username,
        "password",
        name
      );

      // todo password
      const authResp = await api.post("/users/auth", { username, name });
      console.debug("auth respond with username password: ", authResp);
      localStorage.setItem("token", authResp.data.token);

      // if (!isAuth) {
      //   throw new Error("not valid user");
      // }

      // const response = await api.get("/users");
      //
      // // todo how to only get user by username? -> cannot add endpoint for that
      // console.log("response: ", response);
      //
      // // todo get logged in user
      // const found = response.data.filter((x) => x.username === username);
      // console.log("found", found);
      //
      // if (found.length === 0) {
      //   throw new Error("user not found");
      // }
      setLoginError(false);

      // Get the returned user and update a new object. todo
      // const user = new User(found[0]);

      // Store the token into the local storage.
      // localStorage.setItem("token", user.token);
      // localStorage.setItem("token", null);

      // store name set
      setShowName(username);

      // Login successfully worked --> navigate to the route /game in the GameRouter

      navigate("/game");
    } catch (error) {
      // alert(`Something went wrong during the login: \n${handleError(error)}`);
      setLoginError(true);
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
          <FormField
            label="Name"
            value={name}
            onChange={(un: string) => setName(un)}
            inputType="text"
          />
          {/*<FormField*/}
          {/*  label="Password"*/}
          {/*  value={password}*/}
          {/*  onChange={(p) => setPassword(p)}*/}
          {/*  inputType="password"*/}
          {/*/>*/}
          <div className="login">
            <RenderError
              err={loginError}
              text="Error: User or password wrong."
            />
          </div>
          <div className="login button-container">
            <Button
              // disabled={!username || !password}
              disabled={!username || !name}
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
