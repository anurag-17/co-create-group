"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
// import './background.css';
import video1 from "../../public/video1.mp4";
import video2 from "../../public/video2.mp4";
import video3 from "../../public/video3.mp4";
import Header from "./header/Header";

const backgrounds = [video1, video2, video3];
const headings = ["ABOUT US", "SERVICES", "CONTACT US", "HELP AND FAQS"];

const New = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);
  const exitingRef = useRef();
  const [headanimate, setHeadanimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 1000); // Should match the CSS animation duration
    }

    if (headanimate) {
      setTimeout(() => {
        setHeadanimate(false);
      }, 1000);
    }
  }, [animate, next]);

  const changeBackground = () => {
    console.log(next);
    setHeadanimate(true);
    setAnimate(true);
    setPrevious(next - 1);
    setCurrent(next);
    setNext((next + 1) % backgrounds.length);
  };

  return (
    <>
      {/* <button onClick={changeBackground}>Change Background</button> */}
      <div className="containerImage">
        {/* <Header/> */}
        <video
          // ref={videoRef}
          autoPlay
          loop
          muted
          className={`background ${animate ? "animate-exit" : ""}`}
        >
          <source src={backgrounds[previous]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay"></div>

        <video
          autoPlay
          loop
          muted
          className={`background ${animate ? "animate-enter" : ""}`}
        >
          <source src={backgrounds[current]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="container">
          <div
            ref={exitingRef}
            className={`headCont  ${headanimate ? "header-exit" : "hidden"}`}
          >
            <h3 className="main-heading">{headings[previous]}</h3>
          </div>

          <div className={`headCont ${headanimate ? "header-enter" : ""}`}>
            <h3 className="main-heading">{headings[current]}</h3>
          </div>
        </div>
        <button onClick={changeBackground} className="next-btn">
          <Image src="/svg/arrow.svg" width={30} height={30} alt="next" />
        </button>
      </div>
    </>
  );
};

export default New;
