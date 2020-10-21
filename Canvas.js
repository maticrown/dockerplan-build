import React from "react";
import "./Canvas.css";
//import Cropper from "crpperjs";
import "cropperjs/dist/cropper.min.css";

// class CanvasCropper extends React.Component {
//     constructor() {
//         super();
//         this.state = {}
//     }
// }

function Canvas() {
  return (
    <div>
      <canvas
        id="canvas"
        width="200"
        height="100"
        style="border:2px solid #000000;"
      ></canvas>
    </div>
  );
}

export default Canvas;
