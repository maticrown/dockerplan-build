// import React from "react";
// import L from "leaflet";
// import { Marker, Polygon } from "react-leaflet";
// import "./Rectangle.css";

// const PolygonWithText = (props) => {
//   const center = L.polygon(props.coord).getBounds().getCenter();
//   const text = L.divIcon({ html: props.text });

//   return (
//     <Polygon color="blue" positions={props.coords}>
//       <Marker position={center} icon={text} />
//     </Polygon>
//   );
// };

// export default PolygonWithText;

import React from "react";
import { Rect, Transformer } from "react-konva";
const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};
export default Rectangle;
