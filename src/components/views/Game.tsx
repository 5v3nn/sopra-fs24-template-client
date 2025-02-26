import React, { useContext, useEffect, useState } from "react";
import { api, updateUserStatus, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";
import { NameContext } from "../../App";
import { FaRegEye, FaEye } from "react-icons/fa6";
import IconButton from "../ui/IconButton";

const Player = ({ user }: { user: User }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const url = "/game/" + user.id;

  const handleClick = () => {
    console.log("navigate to " + url);
    navigate(url);
  };

  return (
    <div className="player container">
      <div className="player username">{user.username}</div>
      <div className="player name">{user.name}</div>
      <div className="player id">id: {user.id}</div>
      <IconButton
        hoverIcon={FaEye}
        icon={FaRegEye}
        onClick={handleClick}
      ></IconButton>
    </div>
  );
};

Player.propTypes = {
  user: PropTypes.object,
};

const Game = () => {
  // use react-router-dom's hook to access navigation, more info: https://reactrouter.com/en/main/hooks/use-navigate
  const navigate = useNavigate();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://react.dev/learn/state-a-components-memory and https://react.dev/reference/react/useState
  const [users, setUsers] = useState<User[]>(null);

  const { showName, setShowName } = useContext(NameContext);

  const logout = (): void => {
    // update the user status to offline
    updateUserStatus("OFFLINE");

    // cleanup
    localStorage.removeItem("token");
    setShowName("");

    // back to login
    navigate("/login");
  };

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://react.dev/reference/react/useEffect
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        console.log(
          "request to /users with token'",
          localStorage.getItem("token"),
          "'"
        );

        const response = await api.get("/users", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.getItem("token"),
          },
        });

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for details."
        );
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;

  if (users) {
    content = (
      <div className="game">
        <h2>Hello, {showName}</h2>
        <ul className="game user-list">
          {users.map((user: User) => (
            <li key={user.id}>
              <Player user={user} />
            </li>
          ))}
        </ul>
        <Button width="100%" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>Happy Coding!</h2>
      <p className="game paragraph">Get all users from secure endpoint:</p>
      {content}
    </BaseContainer>
  );
};

export default Game;
