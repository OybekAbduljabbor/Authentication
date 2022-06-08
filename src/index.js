import React from "react";
import ReactDOM from "react-dom/client";
import "./Assets/Css/index.css";
import { App } from "./App";
import { SnackbarProvider } from "notistack";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
