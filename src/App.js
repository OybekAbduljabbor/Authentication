import React from "react";

import { Login } from "./Pages/Login/Login";
import { Router } from "./Router";

export function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  return isLogin ? <Router /> : <Login setIsLogin={setIsLogin} />;
}
