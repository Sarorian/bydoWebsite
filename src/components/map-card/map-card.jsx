import React, { useState, useEffect } from "react";

export const MapCard = ({ map, onMapClick }) => {
  const [mapImage, setMapImage] = useState("");

  useEffect(() => {
    const fetchMapImage = async () => {
      try {
        const response = await fetch("https://valorant-api.com/v1/maps");
        const data = await response.json();
        const mapObj = data.data.find(
          (mapData) => mapData.displayName === map.map
        );
        if (mapObj) {
          setMapImage(mapObj.splash);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMapImage();
  }, [map.map]);

  console.log(map);

  return (
    <div
      onClick={() => {
        onMapClick(map);
      }}
    >
      {mapImage && (
        <img
          src={mapImage}
          alt={`Map ${map.map}`}
            style={{ width: "96px", height: "54px" }}
        />
      )}
      <span></span>
    </div>
  );
};
