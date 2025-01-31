import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  // Reference to the webcam component
  const webcamRef = useRef(null);

  // State for storing the captured images (in a real app, this might come from a backend)
  const [images, setImages] = useState([]);

  // React Webcam config (customize if you want different aspect ratios, etc.)
  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user", // "user" for front camera on mobile, "environment" for rear camera
  };

  // Capture image callback
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Add new image to the array
        setImages((prevImages) => [...prevImages, imageSrc]);
      }
    }
  }, [webcamRef]);

  // Handle removal of an image when clicked
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>EPIC MOVEMENT SQUID GAME</h1>

      {/* Webcam Preview */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      {/* Capture Button */}
      <button className="press" onClick={capture}>Capture Photo</button>

      {/* Render the images in a row (or grid) */}
      <div className="photo-row">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`captured-${index}`}
            className="captured-image"
            onClick={() => handleRemoveImage(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
