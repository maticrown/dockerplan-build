import React, { useState, useLayoutEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";
import "./Container.css";

import styled from "styled-components";

import rough from "roughjs/bundled/rough.esm";

//import Hovering from "./components/Host.js";

// const HoverText = styled.p`
//   color: #111;
//   :hover {
//     color: #ed1212;
//     cursor: pointer;
//   }
// `;

// const Hovering = styled.p`
//   color: #000;
//   :hover {
//     color: #ed1212;
//     cursor: pointer;
//   }
// `;

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  // generator.ellipse(x1,y1,x2,y2);
  return { id, x1, y1, x2, y2, type, roughElement };
}

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === "rectangle") {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;
    return start || end || inside;
  }
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const cursorForPosition = (position) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; //should not really get here...
  }
};

// const random = (num) => Math.floor(Math.random() * num) + 1;

// // const [state, setState] = useState([]);

// let state = {
//   canvas: [
//     {
//       x: 250,
//       y: 25,
//       width: 50,
//       height: 100,
//     },
//   ],
// };

// const newRectangle = () => ({
//   x: random(250),
//   y: random(300),
//   width: random(100),
//   height: random(100),
// });

// const handleClick = () => {
//   this.setState((prevState) => ({
//     canvas: [...prevState.canvas, { ...newRectangle() }],
//   }));
// };

// const handleDragStart = (e) => {
//   e.target.setAttrs({
//     shadowOffset: {
//       x: 15,
//       y: 15,
//     },
//     scaleX: 1.1,
//     scaleY: 1.1,
//   });
// };

// const handleDragEnd = (e) => {
//   e.target.to({
//     duration: 0.5,
//     easing: Konva.Easings.ElasticEaseOut,
//     scaleX: 1,
//     scaleY: 1,
//     shadowOffsetX: 5,
//     shadowOffsetY: 5,
//   });
// };

function Container() {
  const [tool, setTool] = useState("line");
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [selectedElement, setSelectedElement] = useState("line");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");

    //  alert(canvas);

    const context = canvas.getContext("2d");
    if (context != null) {
      context.fillStyle = "green";
      context.fillRect(10, 10, 150, 100);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseUp = () => {
    const index = selectedElement.id;
    const { id, type } = elements[index];
    if (action === "drawing" || action === "resizing") {
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, type);
    }
    setAction("none");
    setSelectedElement(null);
  };

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);

      setAction("drawing");
    }
  };
  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updateElement = createElement(id, x1, y1, x2, y2, type);

    const elementsCopy = [...elements];
    elementsCopy[id] = updateElement;
    setElements(elementsCopy);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;

      updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  return (
    <div className="container">
      <button className="rectangle_create" onClick={handleMouseMove}>
        click me
      </button>

      <div className="button">
        <form className="button_input">
          <form className="line_input">
            <input
              type="radio"
              id="line"
              checked={tool === "line"}
              onChange={() => setTool("line")}
            />
            <label htmlFor="line"> Bridge </label>
          </form>
          <input
            type="radio"
            id="selection"
            checked={tool === "selection"}
            onChange={() => setTool("selection")}
          />
          <label htmlFor="selection"> Move </label>
          <input
            type="radio"
            id="rectangle"
            checked={tool === "rectangle"}
            onChange={() => setTool("rectangle")}
          />
          <label htmlFor="rectangle"> Container </label>
        </form>
        <canvas
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          Canvas
        </canvas>
      </div>
      {/* {state.canvas.map((
        { height, width, x, y },
        key // like a "for loop", this maps over this.state.canvas objects and pulls out the height, width, x, y properties to be used below
      ) => (
        <canvas
          key={key}
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="grey"
          draggable
          fill="blue"
          shadowOffset={{ x: 5, y: 5 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          //onClick={handleClick}
        />
      ))} */}
    </div>
  );
}
export default Container;
