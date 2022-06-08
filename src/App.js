import React, { useState, useEffect } from "react";
import { Login } from "./Pages/Login/Login";
import { Router } from "./Router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { acLoading } from "./Redux/Loading/reLoading";
import { acToken } from "./Redux/Auth/reAuth";

export function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [auth, setAuth] = useState(
    JSON.parse(sessionStorage.getItem("auth")) || {}
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      dispatch(acLoading(true));
      axios(`https://toko.ox-sys.com/security/auth_check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        data: `_username=${auth._password}&_password=${auth._username}&_subdomain=${auth._subdomain}`,
      })
        .then((res) => {
          setIsLogin(true);
          setAuth(auth);
          dispatch(acLoading(false));
          dispatch(acToken(res.data.token));
        })
        .catch((err) => {
          setIsLogin(false);
          dispatch(acLoading(false));
        });
    }
    return () => (isSubscribed = false);
  }, [auth, dispatch]);

  return <div>{isLogin ? <Router /> : <Login setIsLogin={setIsLogin} />}</div>;
}
