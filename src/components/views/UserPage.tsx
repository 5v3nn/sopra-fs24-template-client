import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "../../helpers/api";
import {
  MdOutlineModeEdit,
  MdModeEdit,
  MdSave,
  MdOutlineSave,
  MdCancel,
  MdOutlineCancel,
} from "react-icons/md";
import IconButton from "../ui/IconButton";
import UserPageField from "../ui/UserPageField";
import {
  IoChevronBackCircle,
  IoChevronBackCircleOutline,
} from "react-icons/io5";
import RenderError from "../ui/RenderError";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userEdit, setUserEdit] = useState({
    // only edit vars
    username: "",
    name: "",
    birthday: "",
  });
  const [toggled, setToggled] = useState(false);
  const [editError, setEditError] = useState<string>("");

  const [isUserFetched, setIsUserFetched] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserEdit({
      ...userEdit,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) {
      console.log("update user edit");
      setUserEdit({
        username: user.username,
        name: user.name,
        birthday: user.birthday,
      });
    }
  }, [user]);

  const handleSave = () => {
    // Create a new user object with the updated fields
    const updatedUser = {
      ...user,
      ...userEdit,
    };

    async function updateUser() {
      try {
        const url = `/users/${id}`;
        console.log("Try to update user at", url);

        const requestBody = JSON.stringify(updatedUser);

        const response = await api.put(url, requestBody, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.getItem("token"),
          },
        });

        setUser(updatedUser);
        setEditError("");
        setToggled(!toggled);
      } catch (error) {
        const err = handleError(error);
        console.log(
          `Something went wrong during the login: \n${err}\nerror:${error.response}`
        );
        let errMsg = "Unexpected error: " + err;
        // console.log(error);
        if (error.response.status === 403) {
          errMsg = "Error: Not authorized to edit this user.";
          console.log(errMsg);
          setEditError(errMsg);
        } else if (error.response.status === 404) {
          errMsg = "Error: Could not find the user with this id.";
          console.log(errMsg);
          setEditError(errMsg);
        } else if (error.response.status === 400) {
          errMsg =
            "Error: Username not allowed or already used, please choose a different one.";
          console.log(errMsg);
          setEditError(errMsg);
        } else {
          console.log(errMsg);
          setEditError(errMsg);
        }
      }
    }

    updateUser();

    // Send a PUT request to the server with the updated user data
    // alert("api put");
    // console.log("api call with user: ", updatedUser);
  };

  const handleCancel = () => {
    setToggled(!toggled);
    setUserEdit(user);
    setEditError("");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `/users/${id}`;
        console.log("try to fetch:" + url);
        const response = await api.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: localStorage.getItem("token"),
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUser(response.data);
        setIsUserFetched(true);
        setUserEdit({
          username: response.data.username,
          name: response.data.name,
          birthday: response.data.birthday,
        });

        console.log("user", user);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user: \n${handleError(
            error
          )}`
        );
        alert(
          "Something went wrong while fetching the user! See the console for details."
        );
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    if (isUserFetched) {
      setUserEdit(user);
    }
  }, [isUserFetched, user]);

  let content = <Spinner />;

  // ----- for edit ------
  let editMode = <div></div>;
  if (toggled) {
    editMode = (
      <>
        {/*   CANCEL  */}
        <IconButton
          hoverIcon={MdCancel}
          icon={MdOutlineCancel}
          onClick={handleCancel}
          style={{ scale: "1.5", marginRight: "10px" }}
        />
        {/*   SAVE   */}
        <IconButton
          hoverIcon={MdSave}
          icon={MdOutlineSave}
          onClick={handleSave}
          style={{ scale: "1.5", marginLeft: "10px" }}
        />
      </>
    );
  }

  if (user) {
    // set extra editable variables

    console.log("render user/" + id, user.id, user, userEdit);
    content = (
      <div className="game">
        <div style={{ display: "flex" }}>
          {/*  Back Button  */}
          <IconButton
            style={{ scale: "1.5" }}
            className="player"
            hoverIcon={IoChevronBackCircle}
            icon={IoChevronBackCircleOutline}
            disabled={toggled}
            onClick={() => navigate("/game")}
          />
          {/*  Edit Button  */}
          <IconButton
            style={{ marginLeft: "auto", scale: "1.5" }}
            className="player id"
            hoverIcon={MdModeEdit}
            icon={MdOutlineModeEdit}
            disabled={toggled || localStorage.getItem("myId") !== id}
            onClick={() => {
              setToggled(!toggled);
            }}
          ></IconButton>
        </div>
        <UserPageField
          editable={false}
          name="User ID: "
          userProperty={user.id.toString()}
          toggled={toggled}
        />
        <UserPageField
          editable={true}
          inputType="text"
          name="Username: "
          userProperty={userEdit.username}
          setUserProperty={handleInputChange}
          userPropertyName="username"
          toggled={toggled}
        />
        <UserPageField
          editable={true}
          inputType="text"
          name="Name: "
          userProperty={userEdit.name}
          setUserProperty={handleInputChange}
          userPropertyName="name"
          toggled={toggled}
        />
        <UserPageField
          editable={true}
          inputType="date"
          name="Birthday: "
          userProperty={userEdit.birthday}
          setUserProperty={handleInputChange}
          userPropertyName="birthday"
          toggled={toggled}
        />
        <UserPageField
          editable={false}
          name="Status: "
          userProperty={user.status}
          toggled={toggled}
        />
        <UserPageField
          editable={false}
          name="Created: "
          userProperty={user.created}
          toggled={toggled}
        />
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>User Details</h2>
      {content}
      <div className="login" style={{ width: "20em" }}>
        <RenderError err={editError !== ""} text={editError} />
      </div>
      <div>{editMode}</div>
      {/*<Button width="100%" onClick={() => navigate("/game")}>*/}
      {/*  Back*/}
      {/*</Button>*/}
    </BaseContainer>
  );
};

export default UserPage;
