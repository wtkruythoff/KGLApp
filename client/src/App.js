import * as React from "react";
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as locationData from "./data/SouligaRoad01.json";



export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 18.07,
    longitude: -63.07,
    width: "100vw",
    height: "180vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
      window.addEventListener("keydown", listener);
    
      return () => {
        window.removeEventListener("keydown", listener);
      }
  }, []);

  return (
    <div>
    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    mapStyle="mapbox://styles/wtkruythoff/ckjiy3q3i03ux19stagf5oyj0"
    onViewportChange={(viewport) => setViewport(viewport)}
    >
    {locationData.features.map(location => (
      <Marker key={location.properties.BuildCode} latitude={location.geometry.coordinates[1]} longitude={location.geometry.coordinates[0]} >
      <button className="marker-btn" onClick={e => {
        e.preventDefault();
        setSelectedPark(location);
      }}>
      <img src="/map-marker-alt-light.svg" alt="Location Icon"/>
      </button>
      </Marker>
    ))}
    {selectedPark ? (
      <Popup
      latitude={selectedPark.geometry.coordinates[1]}
      longitude={selectedPark.geometry.coordinates[0]}
      onClose={() => {
        setSelectedPark(null);
      }}
      >
      <div>
      <h2>{selectedPark.properties.StreetName}</h2>
      <p>{selectedPark.properties.StreetNumb}</p>
      </div>
      </Popup>
    ) : null}
    </ReactMapGL>
    </div>
  );
}
