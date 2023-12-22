
"use client"
import React, { useState, useEffect, useRef } from 'react';
// import './BackgroundChanger.css';

const backgrounds = [
  'red', // Replace with your URLs
  'blue', // Replace with your URLs
  'green', // Replace with your URLs
];

const BackgroundChanger = () => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);
  const exitingRef = useRef();

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
        <button onClick={changeBackground} style={{zIndex:"111",background:"white",position:"absolute"}}>Change Background</button>
      <div 
        // ref={exitingRef}
        className={`background ${animate ? 'animate-exit' : ''}`} 
        style={{ backgroundColor: `${backgrounds[current]}` }} 
      />
      <div 
        className={`background ${animate ? 'animate-enter ' : ''}`} 
        style={{ backgroundColor: `${backgrounds[next]}` }} 
      />
    </div>
  );
};

export default BackgroundChanger;
// .container {
//     position: relative;
//     height: 100vh;
//     overflow: hidden;
//   }
  
//   .background {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-size: cover;
//     transition: transform 1s ease-in-out ;
//   }
  
//   .animate-exit {
//     transform: translate(-100%, -100%);
//   }
  
//   .animate-enter {
//     transform: translate(0, 0);
//     z-index: -1;
//   }
//   .img-position{
//     transform: translate(100%, 100%);
//     /* z-index: -1; */
//   }
  