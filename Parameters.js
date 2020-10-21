import React from "react";

function Parameters() {
  var parameter = require("./Parameters.json");
  return (
    <div id="parameters">
      <title>parameters</title>
      <p>parameter name ${parameter.name}</p>
      <p>parameter value ${parameter.value}</p>
    </div>
  );
}

export default Parameters;
