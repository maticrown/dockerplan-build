import React from "react";
import "./Host.css";
import Vxlantunnel from "./Tunnels.js";
//import styled from "styled-components";

function Host() {
  var test = "host";
  return (
    <div id="host">
      <Vxlantunnel />
      <title>host</title>
      <p>host ip {test}</p>
    </div>
  );
}

export default Host;
