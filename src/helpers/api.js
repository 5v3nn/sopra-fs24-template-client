import axios from "axios";
import { getDomain } from "./getDomain";

export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: localStorage.getItem("token"),
  },
});

export const updateUserStatus = async (status) => {
  const id = localStorage.getItem("myId");
  try {
    const response = await api.patch(
      `/users/${id}/status`,
      JSON.stringify({ status }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
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
      alert(errMsg);
    } else if (error.response.status === 404) {
      errMsg = "Error: Could not find the user with this id.";
      console.log(errMsg);
      alert(errMsg);
    } else if (error.response.status === 400) {
      errMsg =
        "Error: Username not allowed or already used, please choose a different one.";
      console.log(errMsg);
      alert(errMsg);
    } else {
      console.log(errMsg);
      alert(errMsg);
    }
  }
};

export const handleError = (error) => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log(
      "The request was made and answered but was unsuccessful.",
      error.response
    );

    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert("The server cannot be reached.\nDid you start it?");
    }

    console.log("Something else happened.", error);

    return error.message;
  }
};
