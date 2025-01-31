import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImages((prevImages) => [
          ...prevImages,
          { src: imageSrc, isGreyedOut: false },
        ]);
      }
    }
  }, [webcamRef]);

  const handleToggleGrey = (index) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, isGreyedOut: !img.isGreyedOut } : img
      )
    );
  }

  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>EPIC MOVEMENT SQUID GAME</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button className="press" onClick={capture}>Capture Photo</button>
      <div className="photo-row">
        {images.map((image, index) => (
          <div
            key={index}
            className="image-container"
            onClick={() => handleToggleGrey(index)}
          >
            <div className="image-wrapper">
              <img
                src={image.src}
                alt={`captured-${index}`}
                className="captured-image"
                style={{
                  filter: image.isGreyedOut ? "grayscale(100%)" : "none",
                }}
              />
              <div className="image-number">{index + 1}</div>
              <button className="delete-button" onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}>X</button>
            </div>
            {image.isGreyedOut && <div className="overlay">X</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
