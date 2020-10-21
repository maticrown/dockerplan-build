import React from "react";
import "./Bridge.css";
import "./Bridge.json";
//import Button from "react";

// function handleClick(e, data) {
//   alert(e.data);
// }

function Bridge() {
  var bridge = require("./Bridge.json");
  return (
    <div id="bridge">
      <title>bridge</title>
      <p>bridge name {bridge.name}</p>
      <p>ip address: {bridge.ip}</p>
      {/* <Button onClick={handleClick(bridge_name.name)}></Button> */}
    </div>
  );
}

export default Bridge;
