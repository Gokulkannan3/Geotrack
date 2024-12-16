import React, { useState, useEffect } from "react";

function App() {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    let intervalId;

    // Function to fetch the coordinates
    const fetchCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    if (isTracking) {
      fetchCoordinates(); // Initial fetch
      intervalId = setInterval(fetchCoordinates, 3000); // Fetch every 3 seconds
    }

    // Cleanup interval on component unmount or when tracking stops
    return () => clearInterval(intervalId);
  }, [isTracking]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Live Location Tracker</h1>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: isTracking ? "red" : "green",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => setIsTracking(!isTracking)}
      >
        {isTracking ? "Stop Tracking" : "Start Tracking"}
      </button>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        {coordinates.latitude && coordinates.longitude ? (
          <p>
            Latitude: {coordinates.latitude.toFixed(6)} <br />
            Longitude: {coordinates.longitude.toFixed(6)}
          </p>
        ) : (
          <p>No location data available. Click the button to start tracking.</p>
        )}
      </div>
    </div>
  );
}

export default App;
