import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import PolygonWithText from "./Rectangle.js";

import Konva from "konva";

const uuidv1 = require("uuid");
console.log(uuidv1.v1());

class MyMap extends Component {
  render() {
    return (
      <Map center={[20.75, -156.45]} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <PolygonWithText text="MyText" coords={[1, 2]} /> */}
      </Map>
    );
  }
}

export default MyMap;
