import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import FormField from "../ui/FormField";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "../ui/Button";
import "styles/views/Login.scss";

const Registration = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(null);
  const [name, setName] = useState<string>(null);
  const [username, setUsername] = useState<string>(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, name, password });
      api.post("/users", requestBody);
      console.log("post request to /users with payload: ", requestBody);

      // redirect to login page
      navigate("/login");
    } catch (error) {
      alert(
        `Something went wrong during the registration: \n${handleError(error)}`
      );
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
          <div className="login button-container">
            <Button
              disabled={!username || !name || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Registration;
