"use client";
import { myFont2 } from "@/app/font";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import video1 from "../../../public/video1.mp4";
import video2 from "../../../public/video2.mp4";
import video3 from "../../../public/video3.mp4";
import video4 from "../../../public/video4.mp4";
import Header from "../header/Header";

const backgrounds = [video1, video2, video3, video4, video1, video2, video3];


const headingThree = [
  "Facilitation",
  "Fractional C-Level Staffing",
  "Board Development",
  "IPO/SPC/Direct Listing/Merger Support",
  "Access to Funding and Financing",
  "Specialized Investment Trusts & Funds",
  "Direct Mentorship and Business Consulting",
];

const Services = ({setShow}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [animate, setAnimate] = useState(true);
  const exitingRef = useRef();
  const [headanimate, setHeadanimate] = useState(true);


  console.log("prev",previousPage)
console.log("curr",nextPage)

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
  }, [animate, nextPage]);
  
  const changeBackgroundVid = () => {

    setHeadanimate(true);
    setAnimate(true);
    setPreviousPage(nextPage - 1);
    setCurrentPage(nextPage);
    setNextPage((nextPage + 1) % backgrounds.length);
  };

  

  return (
    <>
      {/* <button onClick={changeBackgroundVid}>Change Background</button> */}
        {/* <Header handleClick={onReset} /> */}
        <video
          // ref={videoRef}
          autoPlay
          loop
          muted
          className={`background ${animate ? "animate-exit" : ""}`}
        >
          <source src={backgrounds[previousPage]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay"></div>

        <video
          autoPlay
          loop
          muted
          className={`background ${animate ? "animate-enter" : ""}`}
        >
          <source src={backgrounds[currentPage]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="container">
            <div className="flex gap-2 absolute z-10 top-[13%] text-[white] 2xl:text-[16px] text-[12px] font-bold leading-[26px] cursor-pointer" onClick={()=>setShow(false)}> 
            <Image src="/svg/left-arrow.svg" alt="back" height={16} width={16} /> 
            Back</div>
          <div
            ref={exitingRef}
            className={`headCont  ${headanimate ? "header-exit" : "hidden"}`}
          >
            <h3 className="main-heading main-head2">WHAT DO WE DO?</h3>
          </div>

          <div className={`headCont ${headanimate ? "header-enter" : ""}`}>
            <h3 className="main-heading main-head2">WHAT DO WE DO?</h3>
          </div>

    
          <div>
            <div
              ref={exitingRef}
              className={`sub-headContThree ${
                headanimate ? "headerThree-exit" : "hidden"
              }`}
            >
              <p className="heading3">{headingThree[previousPage]}</p>
            </div>

            <div
              className={`sub-headContThree ${
                headanimate ? "headerThree-enter" : ""
              }`}
            >
              <p className="heading3">{headingThree[currentPage]}</p>
            </div>
          </div>

          {/* count */}
          <div className={`${myFont2.className}`}>
            <div
              ref={exitingRef}
              className={`serialCount ${
                headanimate ? "headerThree-exit" : "hidden"
              }`}
            >
              <p>
                {previousPage + 1 === 0
                  ? ""
                  : (previousPage + 1)?.toString()?.padStart(2, "0")}
              </p>
            </div>

            <div
              className={`serialCount ${
                headanimate ? "headerThree-enter" : ""
              }`}
            >
              <p>{(currentPage + 1)?.toString()?.padStart(2, "0")}</p>
            </div>
          </div>
        </div>

        {/* button */}
        <button
          onClick={changeBackgroundVid}
          className={
            currentPage + 1 === backgrounds?.length
              ? "btnRotate next-btn"
              : "next-btn"
          }
        >
          <Image src="/svg/arrow.svg" width={30} height={30} alt="next" />
        </button>
    </>
  );
};

export default Services;
