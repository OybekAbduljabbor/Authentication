import React, { useState } from "react";
import "./Login.css";
import icon from "../../Assets/Icons/Group.svg";
import user from "../../Assets/Icons/user.svg";
import lock from "../../Assets/Icons/lock.svg";
import on from "../../Assets/Icons/eye-Regular.svg";
import off from "../../Assets/Icons/eye-slash-Regular.svg";
import axios from "axios";
import loadingAnimate from "../../Assets/Icons/loading.gif";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { acToken } from "../../Redux/Auth/reAuth";
import { useSelector, useDispatch } from "react-redux";
import { acLoading } from "../../Redux/Loading/reLoading";

export function Login({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.reLoading);

  console.log(loading);

  // login function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(acLoading(true));

    // get user input
    const _username = e.target.login.value;
    const _password = e.target.password.value;
    const _subdomain = "toko";

    // axios request
    axios(`https://${_subdomain}.ox-sys.com/security/auth_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: `_username=${_username}&_password=${_password}&_subdomain=${_subdomain}`,
    })
      .then((res) => {
        console.log(res.data.token);
        dispatch(acToken(res.data.token));
        setIsLogin(true);
        enqueueSnackbar("Login Success", {
          variant: "success",
        });
        dispatch(acLoading(false));

        sessionStorage.setItem(
          "auth",
          JSON.stringify({
            _username,
            _password,
            _subdomain,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Login Failed", {
          variant: "error",
        });
        dispatch(acLoading(false));
      });

    clearInput(e);
  };

  function clearInput(e) {
    e.target.login.value = "";
    e.target.password.value = "";
  }

  return (
    <div id="login-page">
      <form id="login-form" onSubmit={handleSubmit}>
        <figure>
          <img src={icon} alt="icon" />
        </figure>
        <div>
          <img src={user} alt="" />
          <input
            type="text"
            name="login"
            placeholder="Login"
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
        <div>
          <img src={lock} alt="" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="off"
            autoCapitalize="off"
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);

              setTimeout(() => {
                setShowPassword(false);
              }, 1500);
            }}
          >
            <img src={showPassword ? on : off} alt="" />
          </button>
        </div>
        <Button type="submit">LOGIN</Button>
      </form>

      <div id="loading" style={loading ? { display: "flex" } : {}}>
        <figure>
          <img src={loadingAnimate} alt="" />
        </figure>
      </div>
    </div>
  );
}
