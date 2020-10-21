import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { Map, TileLayer } from "react-leaflet";
import rough from "roughjs/bundled/rough.esm";

import Rectangle from "konva";

import Bridge from "./components/Bridge.js";
import Container from "./components/Container";
import Host from "./components/Host";
import PolygonWithText from "./components/Rectangle.js";
import Mapping from "./components/Map.js";

import "react-contexify/dist/ReactContexify.min.css";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import styled from "styled-components";

import { Router, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import TopBar from "./components/TopBar";
import { createBrowserHistory as createHistory } from "history";

import Dockerplan from "./components/Dockerplan";

import Canvas from "./components/Canvas";

const history = createHistory();

//import Hovering from "./components/Host.js";

const HoverText = styled.p`
  color: #111;
  :hover {
    color: #ed1212;
    cursor: pointer;
  }
`;

const Hovering = styled.p`
  color: #000;
  :hover {
    color: #ed1212;
    cursor: pointer;
  }
`;

// const generator = rough.generator();

// function createElement(id, x1, y1, x2, y2, type) {
//   const roughElement =
//     type === "line"
//       ? generator.line(x1, y1, x2, y2)
//       : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
//   // generator.ellipse(x1,y1,x2,y2);
//   return { id, x1, y1, x2, y2, type, roughElement };
// }

// const nearPoint = (x, y, x1, y1, name) => {
//   return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
// };

// const positionWithinElement = (x, y, element) => {
//   const { type, x1, x2, y1, y2 } = element;
//   if (type === "rectangle") {
//     const topLeft = nearPoint(x, y, x1, y1, "tl");
//     const topRight = nearPoint(x, y, x2, y1, "tr");
//     const bottomLeft = nearPoint(x, y, x1, y2, "bl");
//     const bottomRight = nearPoint(x, y, x2, y2, "br");
//     const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
//     return topLeft || topRight || bottomLeft || bottomRight || inside;
//   } else {
//     const a = { x: x1, y: y1 };
//     const b = { x: x2, y: y2 };
//     const c = { x, y };
//     const offset = distance(a, b) - (distance(a, c) + distance(b, c));
//     const start = nearPoint(x, y, x1, y1, "start");
//     const end = nearPoint(x, y, x2, y2, "end");
//     const inside = Math.abs(offset) < 1 ? "inside" : null;
//     return start || end || inside;
//   }
// };

// const distance = (a, b) =>
//   Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

// const getElementAtPosition = (x, y, elements) => {
//   return elements
//     .map((element) => ({
//       ...element,
//       position: positionWithinElement(x, y, element),
//     }))
//     .find((element) => element.position !== null);
// };

// const adjustElementCoordinates = (element) => {
//   const { type, x1, y1, x2, y2 } = element;
//   if (type === "rectangle") {
//     const minX = Math.min(x1, x2);
//     const maxX = Math.max(x1, x2);
//     const minY = Math.min(y1, y2);
//     const maxY = Math.max(y1, y2);
//     return { x1: minX, y1: minY, x2: maxX, y2: maxY };
//   } else {
//     if (x1 < x2 || (x1 === x2 && y1 < y2)) {
//       return { x1, y1, x2, y2 };
//     } else {
//       return { x1: x2, y1: y2, x2: x1, y2: y1 };
//     }
//   }
// };

// const cursorForPosition = (position) => {
//   switch (position) {
//     case "tl":
//     case "br":
//     case "start":
//     case "end":
//       return "nwse-resize";
//     case "tr":
//     case "bl":
//       return "nesw-resize";
//     default:
//       return "move";
//   }
// };

// const resizedCoordinates = (clientX, clientY, position, coordinates) => {
//   const { x1, y1, x2, y2 } = coordinates;
//   switch (position) {
//     case "tl":
//     case "start":
//       return { x1: clientX, y1: clientY, x2, y2 };
//     case "tr":
//       return { x1, y1: clientY, x2: clientX, y2 };
//     case "bl":
//       return { x1: clientX, y1, x2, y2: clientY };
//     case "br":
//     case "end":
//       return { x1, y1, x2: clientX, y2: clientY };
//     default:
//       return null; //should not really get here...
//   }
// };

const App = () => {
  //   const [elements, setElements] = useState([]);
  //   const [tool, setTool] = useState("line");
  //   const [action, setAction] = useState("none");
  //   const [selectedElement, setSelectedElement] = useState("none");

  //   useLayoutEffect(() => {
  //     const canvas = document.getElementById("canvas");

  //     //  alert(canvas);

  //     const context = canvas.getContext("2d");
  //     if (context != null) {
  //       context.fillStyle = "green";
  //       context.fillRect(10, 10, 150, 100);
  //     }

  //     context.clearRect(0, 0, canvas.width, canvas.height);

  //     const roughCanvas = rough.canvas(canvas);

  //     elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  //   }, [elements]);

  //   const updateElement = (id, x1, y1, x2, y2, type) => {
  //     const updateElement = createElement(id, x1, y1, x2, y2, type);

  //     const elementsCopy = [...elements];
  //     elementsCopy[id] = updateElement;
  //     setElements(elementsCopy);
  //   };

  //   const handleMouseDown = (event) => {
  //     const { clientX, clientY } = event;
  //     if (tool === "selection") {
  //       const element = getElementAtPosition(clientX, clientY, elements);
  //       if (element) {
  //         const offsetX = clientX - element.x1;
  //         const offsetY = clientY - element.y1;
  //         setSelectedElement({ ...element, offsetX, offsetY });
  //         if (element.position === "inside") {
  //           setAction("moving");
  //         } else {
  //           setAction("resizing");
  //         }
  //       }
  //     } else {
  //       const id = elements.length;
  //       const element = createElement(
  //         id,
  //         clientX,
  //         clientY,
  //         clientX,
  //         clientY,
  //         tool
  //       );
  //       setElements((prevState) => [...prevState, element]);
  //       setSelectedElement(element);

  //       setAction("drawing");
  //     }
  //   };

  //   //   function clearcanvas1() {
  //   //     const canvas = document.getElementById("");
  //   //     alert(canvas);
  //   //     const context = canvas.getContext("2d");
  //   //     context.clearRect(0, 0, canvas.width, canvas.height);
  //   //   }

  //   const handleMouseMove = (event) => {
  //     const { clientX, clientY } = event;
  //     if (tool === "selection") {
  //       const element = getElementAtPosition(clientX, clientY, elements);
  //       event.target.style.cursor = element
  //         ? cursorForPosition(element.position)
  //         : "default";
  //     }

  //     if (action === "drawing") {
  //       const index = elements.length - 1;
  //       const { x1, y1 } = elements[index];
  //       updateElement(index, x1, y1, clientX, clientY, tool);
  //     } else if (action === "moving") {
  //       const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
  //       const width = x2 - x1;
  //       const height = y2 - y1;
  //       const newX1 = clientX - offsetX;
  //       const newY1 = clientY - offsetY;

  //       updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
  //     } else if (action === "resizing") {
  //       const { id, type, position, ...coordinates } = selectedElement;
  //       const { x1, y1, x2, y2 } = resizedCoordinates(
  //         clientX,
  //         clientY,
  //         position,
  //         coordinates
  //       );
  //       updateElement(id, x1, y1, x2, y2, type);
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     const index = selectedElement.id;
  //     const { id, type } = elements[index];
  //     if (action === "drawing" || action === "resizing") {
  //       const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
  //       updateElement(id, x1, y1, x2, y2, type);
  //     }
  //     setAction("none");
  //     setSelectedElement(null);
  //   };

  //   function handleClick(e, data) {
  //     alert("hi");
  //   }

  //   const Button = styled.button`
  //     font-size: 1em;
  //     margin: 1em;
  //     padding: 0.25em 1em;
  //     border-radius: 3px;

  //     /* Color the border and text with theme.main */
  //     color: ${(props) => props.theme.main};
  //     border: 2px solid ${(props) => props.theme.main};
  //   `;

  //   const Div = styled.p`
  //     padding: 16px;
  //     color: black;
  //   `;

  //   const HostForm = styled.p`
  //     padding: 20px;
  //     text-align: center;
  //     background-color: green;
  //     display: flex;
  //     border: 5px solid blue;
  //   `;

  //   const ContainerForm = styled.p`
  //     padding: 20px;
  //     text-align: right;
  //     display: flex;
  //     background-color: purple;
  //     border: 5px solid red;
  //   `;

  //   const BridgeLine = styled.p`
  //     padding: 20px;
  //     background-color: yellow;
  //     display: flex;
  //     text-align: center;
  //     border: 5px soild black;
  //     margin-right: 8rem;
  //   `;

  return (
    <div className="app">
      <div className="click">{<Dockerplan />}</div>
      {/* <Container />}
      // {<Host /> */}
      {/* /* <Mapping /> */}

      {/* <button onClick={clickFunc}>Click here</button> */}

      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />
      </Router>

      {/* <Rectangle bounds={PolygonWithText.coords}></Rectangle> */}
    </div>

    //   <Div>
    //     <div>
    //       <HostForm>
    //         <form id="host">
    //           <Button
    //             checked={tool === "rectangle"}
    //             onChange={() => setTool("rectangle")}
    //             //   onCick={clearcanvas1()}
    //           >
    //             click me
    //           </Button>
    //           <HoverText>
    //             <input
    //               type="radio"
    //               id="line"
    //               checked={tool === "line"}
    //               onChange={() => setTool("line")}
    //             />
    //             <label htmlFor="line"> Bridge </label>
    //           </HoverText>
    //           {/* <Hovering>
    //             <input
    //               type="radio"
    //               id="hover"
    //               checked={tool === "hover"}
    //               onChange={() => setTool("hover")}
    //             />
    //             <label htmlFor="hover"> Hover </label>
    //           </Hovering> */}
    //           {/* <input
    //             type="radio"
    //             onClick={Bridge}
    //             id="bridge"
    //             checked={tool === "bridge"}
    //           />
    //           <label htmlFor="selection"> Bridge </label> */}
    //           <input
    //             type="radio"
    //             id="selection"
    //             checked={tool === "selection"}
    //             onChange={() => setTool("selection")}
    //           />
    //           <label htmlFor="selection"> Move </label>
    //           <input
    //             type="radio"
    //             id="rectangle"
    //             checked={tool === "rectangle"}
    //             onChange={() => setTool("rectangle")}
    //           />
    //           <label htmlFor="rectangle"> Container </label>
    //           <canvas
    //             id="canvas"
    //             width={window.innerWidth}
    //             height={window.innerHeight}
    //             onMouseDown={handleMouseDown}
    //             onMouseMove={handleMouseMove}
    //             onMouseUp={handleMouseUp}
    //           >
    //             Canvas
    //           </canvas>
    //         </form>
    //       </HostForm>
    //       <ContainerForm>
    //         <form id="container">
    //           <Container />
    //           <Host />
    //           <Bridge />
    //         </form>

    //         <div style={{ position: "fixed" }}>
    //           <ContextMenuTrigger id="same_unique_identifier"></ContextMenuTrigger>
    //           <ContextMenu id="same_unique_identifier">
    //             <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
    //               ContextMenu Item 1
    //             </MenuItem>
    //             <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
    //               ContextMenu Item 2
    //             </MenuItem>
    //             <MenuItem divider />
    //             <MenuItem data={{ foo: "bar" }} onClick={handleClick}>
    //               ContextMenu Item 3
    //             </MenuItem>
    //           </ContextMenu>
    //           {}

    //           <form>
    //             <Container />
    //             <Host />
    //             <Bridge />
    //           </form>
    //         </div>
    //         {/* <canvas
    //         id="canvas"
    //         width={window.innerWidth}
    //         height={window.innerHeight}
    //         onMouseDown={handleMouseDown}
    //         onMouseMove={handleMouseMove}
    //         onMouseUp={handleMouseUp}
    //       >
    //         Canvas
    //       </canvas> */}
    //         {/* <form>
    //         <Container />
    //         <Host />
    //         <Bridge />
    //       </form>
    //       <div id="container"></div> */}
    //       </ContainerForm>
    //     </div>
    //   </Div>
  );
};
export default App;
