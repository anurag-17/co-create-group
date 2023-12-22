"use client"
import React, { useState, useEffect, useRef } from 'react';

const backgrounds = ['red', 'blue', 'green'];

const BackgroundChanger = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setCurrent(next);
        setNext((next + 1) % backgrounds.length);
        setAnimate(false);
      }, 1100); // Should match the CSS animation duration
    }
  }, [animate, next]);

  const changeBackground = () => {
    setAnimate(true);
  };

  return (
    <div className="container">
       <div className="video-background">
      <video autoPlay loop muted>
        <source src="/path/to/your/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  );
};

export default BackgroundChanger;
