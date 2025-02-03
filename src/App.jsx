import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  // Capture photo from Webcam
  const capture = useCallback(
    (e) => {
      e.preventDefault();
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          setImages((prevImages) => [
            ...prevImages,
            {
              src: imageSrc,
              isGreyedOut: false,
              name: name || `Person ${prevImages.length + 1}`,
              points: 0,
            },
          ]);
          setName("");
        }
      }
    },
    [webcamRef, name]
  );

  // Toggle grayscale on/off
  const handleToggleGrey = (index) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, isGreyedOut: !img.isGreyedOut } : img
      )
    );
  };

  // Delete an image
  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Add points to all active (not greyed out) images
  const handleAddPoints = (points) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        !img.isGreyedOut ? { ...img, points: img.points + points } : img
      )
    );
  };

  // Subtract points from all active (not greyed out) images
  const handleSubtractPoints = (points) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        !img.isGreyedOut ? { ...img, points: img.points - points } : img
      )
    );
  };

  return (
    <div className="App">
      <h1>EPIC MOVEMENT SQUID GAME</h1>

      {/* Webcam + capture controls at the top */}
      <div className="webcam-section">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <div className="capture-controls">
          <input
            name="query"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <button type="button" className="Capture" onClick={capture}>
            Capture Photo 📷
          </button>
        </div>
      </div>

      {/* Subtract buttons pinned on the left side of the screen */}
      <div className="left-controls">
        <button
          className="Point_Button_subtract"
          onClick={() => handleSubtractPoints(1)}
        >
          -1
        </button>
        <button
          className="Point_Button_subtract"
          onClick={() => handleSubtractPoints(3)}
        >
          -3
        </button>
        <button
          className="Point_Button_subtract"
          onClick={() => handleSubtractPoints(5)}
        >
          -5
        </button>
      </div>

      {/* Add buttons pinned on the right side of the screen */}
      <div className="right-controls">
        <button
          className="Point_Button_add"
          onClick={() => handleAddPoints(1)}
        >
          +1
        </button>
        <button
          className="Point_Button_add"
          onClick={() => handleAddPoints(3)}
        >
          +3
        </button>
        <button
          className="Point_Button_add"
          onClick={() => handleAddPoints(5)}
        >
          +5
        </button>
      </div>

      {/* Photo row in the center (side-by-side). 
          You can scroll if there are many pictures, 
          while buttons remain pinned on the sides. */}
      <div className="photo-row">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${image.isGreyedOut ? "greyed-out" : ""}`}
            onClick={() => handleToggleGrey(index)}
          >
            <div className="image-wrapper">
              <img
                src={image.src}
                alt={`captured-${index}`}
                className="captured-image"
              />
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                X
              </button>
            </div>
            <div className="person_name">
              {image.name} ({image.points} pts)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
