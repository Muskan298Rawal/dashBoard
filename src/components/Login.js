import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Checkbox, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../Redux/Actions/LoginAction";
import { SET_ERROR } from "../Redux/Actions/ActionTypes";
import { displaySuccess, displayError } from "../helper";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    "& .MuiFormControl-root.MuiTextField-root": {
      margin: "10px 0px",
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  label: {
    margin: "10px 0px",
  },
  rememberMeSection: {
    display: "flex",
    flexDirection: "row",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    background: "blue",
    color: "white",
  },
}));

function Login() {
  const classes = useStyles();
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, userData, error } = useSelector((state) => state.user);

  React.useEffect(() => {
      if (error) {
        displayError("Invalid Credentials", "danger");
      }
      if (userData) {
        displaySuccess("Login Success", "success");
      }
  }, [userData, error]);

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if(error){
      dispatch({ type: SET_ERROR, payload: "" });
    }
    
    dispatch(fetchUser(user.email, user.password, rememberMe));
  };

  useEffect(() => {
    if(userData){
      navigate("/dashboard");
    }
  }, [userData])

    return (
      <div className={classes.root}>
        <h1 classes={classes.heading}>DashBoard Login</h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={classes.box}
        >
          <TextField
            id="email"
            onChange={handleChange}
            label="Email"
            variant="outlined"
            className={classes.label}
          />
          <TextField
            type="password"
            id="password"
            onChange={handleChange}
            label="Password"
            variant="outlined"
            className={classes.label}
          />
          <div className={classes.rememberMeSection}>
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="subtitle1" style={{ lineHeight: "2.75" }}>
              {" "}
              Remember Me{" "}
            </Typography>
          </div>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={classes.btn}
            disabled={loading || !user.email || !user.password || !rememberMe}
          >
            Login
          </Button>
        </Box>
      </div>
    );
}

export default Login;
