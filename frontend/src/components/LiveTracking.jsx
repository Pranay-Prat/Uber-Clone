import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = { lat: 0, lng: 0 }; // Default center

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  // Function to update current position
  const updatePosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );
  };

  // Update position every 10 seconds
  useEffect(() => {
    updatePosition(); // Get initial position

    const intervalId = setInterval(updatePosition, 10000); // Update every 10 sec

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        {/* Default Marker */}
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
