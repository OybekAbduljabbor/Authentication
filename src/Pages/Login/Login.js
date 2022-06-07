import React, { useState } from "react";
import "./Login.css";
import icon from "../../Assets/Icons/Group.svg";
import user from "../../Assets/Icons/user.svg";
import lock from "../../Assets/Icons/lock.svg";
import on from "../../Assets/Icons/eye-Regular.svg";
import off from "../../Assets/Icons/eye-slash-Regular.svg";
import axios from "axios";

export function Login({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  // login function
  const handleSubmit = (e) => {
    e.preventDefault();

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
        console.log(res.data);
        setIsLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="login-page">
      <form id="login-form" onSubmit={handleSubmit}>
        <figure>
          <img src={icon} alt="icon" />
        </figure>
        <div>
          <img src={user} alt="" />
          <input type="text" name="login" placeholder="Login" />
        </div>
        <div>
          <img src={lock} alt="" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <img src={showPassword ? on : off} alt="" />
          </button>
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}
