import React, { useState } from "react";
import "./Login.css";
import icon from "../../Assets/Icons/Group.svg";
import user from "../../Assets/Icons/user.svg";
import lock from "../../Assets/Icons/lock.svg";
import on from "../../Assets/Icons/eye-Regular.svg";
import off from "../../Assets/Icons/eye-slash-Regular.svg";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="login-page">
      <form id="login-form">
        <figure>
          <img src={icon} alt="icon" />
        </figure>
        <div>
          <img src={user} alt="" />
          <input type="text" placeholder="Login" />
        </div>
        <div>
          <img src={lock} alt="" />
          <input
            type={showPassword ? "text" : "password"}
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
