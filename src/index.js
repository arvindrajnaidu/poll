import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.CasualSeller = {
  db: {
    getItem: async function (key) {
      let val = window.localStorage.getItem(key)
      return val ? JSON.parse(val) : null;
    },
    setItem: async function (key, val) {
      return window.localStorage.setItem(key,JSON.stringify(val));
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App onOrderSubmitted={console.log} />
  </React.StrictMode>,
  document.getElementById("root")
);
