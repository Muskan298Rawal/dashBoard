import axios from "axios";
import { displayError, displaySuccess } from "../../helper";
import { SET_ERROR, SET_LOADING, SET_USER } from "./ActionTypes";

export const fetchUser = (email, password, rememberMe) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING });
    axios
      .post("https://sigviewauth.sigmoid.io/signIn", {
        email,
        password,
        rememberMe,
      })
      .then((response) => {
        dispatch({ type: SET_USER, payload: response.data });
        if (rememberMe) {
          localStorage.setItem("access_token", response.data.token);
        } else {
          sessionStorage.setItem("access_token", response.data.token);
        }
        displaySuccess("Login Success", "success");
      })
      .catch((error) => {
        dispatch({
          type: SET_ERROR,
          payload: error.response.data.statusMessage,
        });
        displayError("Invalid Credentials", "danger");
      });
  };
};
