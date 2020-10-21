import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
  document.getElementById("canvas").getContext("2d").moveTo(0, 0),
  document.getElementById("canvas").getContext("2d").lineTo(50, 100),
  document.getElementById("canvas").getContext("2d").stroke(),
  document.getElementById("canvas").getContext("2d").beginPath(),
  document
    .getElementById("canvas")
    .getContext("2d")
    .moveTo(1, 50, 40, 0, 2 * Math.PI),
  document.getElementById("canvas").getContext("2d").stroke()
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
