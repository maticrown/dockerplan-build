import React from "react";
import "./Dockerplan.css";

import { PythonShell } from "python-shell";

const clickFunc = () => {
  PythonShell.runString("dockerplan_script.py", null, function (err) {
    if (err) throw err;
    alert("finished");
  });
};

function Dockerplan() {
  return (
    <div className="dockerplan">
      <button className="button_click" onClick={clickFunc}>
        Click here
      </button>
    </div>
  );
}

export default Dockerplan;
