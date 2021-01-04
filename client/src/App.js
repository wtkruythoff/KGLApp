import * as React from "react";
import { useState } from 'react';
import ReactMapGL from "react-map-gl";



export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 18.07,
    longitude: -63.07,
    width: "100vw",
    height: "180vh",
    zoom: 10
  });

  return (
    <div>
    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    onViewportChange={(viewport) => setViewport(viewport)}
    >points</ReactMapGL>
    </div>
  );
}
