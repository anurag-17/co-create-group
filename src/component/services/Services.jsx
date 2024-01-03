"use client";
import { myFont2 } from "@/app/font";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const Services = ({ setShow, subPagesData ,isMuted}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [animate, setAnimate] = useState(true);
  const exitingRef = useRef();
  const [headanimate, setHeadanimate] = useState(true);
  const [isMutedPage, setIsMutedPage] = useState(isMuted)
  const videoRef = useRef(null);
  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }

    if (headanimate) {
      setTimeout(() => {
        setHeadanimate(false);
      }, 1000);
    }
  }, [animate, nextPage]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMutedPage;
    }
  }, [isMutedPage]);
  const changeBackgroundVid = () => {

    setHeadanimate(true);
    setAnimate(true);
    setPreviousPage(nextPage - 1);
    setCurrentPage(nextPage);
    setNextPage((nextPage + 1) % subPagesData?.length);
  };
  const playAudio = () => {
    setIsMutedPage(false)
  }

  return (
    <>
      {/* <button onClick={changeBackgroundVid}>Change Background</button> */}
      {/* <Header handleClick={onReset} /> */}
      <video
        // ref={videoRef}
        autoPlay
        key={previousPage + 1}
        loop
        muted
        className={`background ${animate ? "animate-exit" : ""}`}
      >
        <source src={subPagesData[previousPage]?.bgUrl+ '?v=' + new Date().getTime()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay"></div>

      <video
        autoPlay
        loop
        muted={isMutedPage}
        ref={videoRef}
        key={currentPage + 2}
        className={`background ${animate ? "animate-enter" : ""}`}
      >
        <source src={subPagesData[currentPage]?.bgUrl+ '?v=' + new Date().getTime()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container" onClick={playAudio}>
        <div className="flex gap-2 absolute z-10 top-[13%] text-[white] 2xl:text-[16px] text-[12px] font-bold leading-[26px] cursor-pointer" onClick={() => setShow(false)}>
          <Image src="/svg/left-arrow.svg" alt="back" height={16} width={16} />
          Back</div>
        <div
          ref={exitingRef}
          className={`headCont  ${headanimate ? "header-exit" : "hidden"}`}
        >
          <h3 className="main-heading main-head2">{subPagesData[previousPage]?.title}</h3>
        </div>

        <div className={`headCont ${headanimate ? "header-enter" : ""}`}>
          <h3 className="main-heading main-head2">{subPagesData[currentPage]?.title}</h3>
        </div>


        <div>
          <div
            ref={exitingRef}
            className={`sub-headContThree ${headanimate ? "headerThree-exit" : "hidden"
              }`}
          >
            <p className="heading3">{subPagesData[previousPage]?.paragraph}</p>
          </div>

          <div
            className={`sub-headContThree ${headanimate ? "headerThree-enter" : ""
              }`}
          >
            <p className="heading3">{subPagesData[currentPage]?.paragraph}</p>
          </div>
        </div>

        {/*--------- count -----------*/}
        <div className={`${myFont2.className}`}>
          <div
            ref={exitingRef}
            className={`serialCount ${headanimate ? "headerThree-exit" : "hidden"
              }`}
          >
            <p>
              {previousPage + 1 === 0
                ? ""
                : (previousPage + 1)?.toString()?.padStart(2, "0")}
            </p>
          </div>

          <div
            className={`serialCount ${headanimate ? "headerThree-enter" : ""
              }`}
          >
            <p>{(currentPage + 1)?.toString()?.padStart(2, "0")}</p>
          </div>
        </div>
      </div>

      {/*------------next button----------------- */}
      <button
        onClick={changeBackgroundVid}
        className={
          currentPage + 1 === subPagesData?.length
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
