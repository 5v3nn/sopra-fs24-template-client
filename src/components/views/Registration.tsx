import React, { useState, useContext } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import FormField from "../ui/FormField";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "../ui/Button";
import "styles/views/Login.scss";
import { NameContext } from "../../App";
import RenderError from "../ui/RenderError";

const Registration = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(null);
  const [name, setName] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  const { showName, setShowName } = useContext(NameContext);

  const [loginError, setLoginError] = useState<string>("");

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, name, password });
      console.log("post request to /users with payload: ", requestBody);

      const response = await api.post("/users", requestBody);

      // set login token
      const user = new User(response.data);
      localStorage.setItem("token", user.token);

      console.log(
        "response from /users: ",
        response,
        "to get user token",
        response.data
      );

      // set show name to greet registered user
      setShowName(name);

      // no error
      setLoginError("");

      // redirect to overview page (automatically logged in)
      navigate("/game");
    } catch (error) {
      const err = handleError(error);
      console.log(
        `Something went wrong during the login: \n${err}\nerror:${error.response}`
      );
      // console.log(error);
      if (error.response.status === 400) {
        setLoginError(
          "Error: Username is already occupied, please choose a different username."
        );
      } else {
        setLoginError("Unexpected error: " + err);
      }
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
              disabled={!username || !name || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
          <div className="login button-container">
            <Button width="100%" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Registration;
