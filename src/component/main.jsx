"use client";
import Image from "next/image";
import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import video1 from "../../public/contact_us.mp4";
import video2 from "../../public/help_faq.mp4";
import co_create from "../../public/co-create.mp4";

import Header from "./header/Header";
import Services from "./services/Services";
import { myFont2 } from "../app/font";
import ContactDetails from "./modal/ContactDetails";
import EmailPopup from "./modal/EmailPopup";
import { BASE_URL } from "./config";
import Loader from "./websiite-loader/Index";

const staticPages = [
  {
    title: "contact US",
    paragraph: "I'm Ready!",
    // isSubpage: false,
    // paragraph: "LETS CONNECT",
    bgUrl: video1,
  },
  {
    title: "HELP AND FAQS",
    paragraph: "Help Desk",
    // isSubpage: false,
    // paragraph: "SUPPORT",
    bgUrl: video2,
  },
];

const MainPage = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);
  const exitingRef = useRef();
  const [headanimate, setHeadanimate] = useState(false);
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [subPagesData, setSubPagesData] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [contactDetails, setContactDetails] = useState([]);
  const videoRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(false);
  // popup
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [defaultModal, setDefaultModal] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
const [isTransition, setIsTransition] = useState(false);

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
  }, [animate, next,isTransition]);

  const changeBackground = () => {
    // setIsTransition(true)
    // setTimeout(() => {
    //   setIsTransition(false)
      setIsPlaying(true);
      setHeadanimate(true);
      setAnimate(true);
      setPrevious(next - 1);
      setCurrent(next);
      setNext((next + 1) % allData?.length);
    // }, 2000);
  };

  const prevBackground = () => {
    setIsPlaying(true);
    setHeadanimate(true);
    setAnimate(true);

    if (previous >= 0) {
      // setPrevious((prev) => prev - 1);
      // setCurrent((prev) => prev - 1);
      // setNext((prev) => prev - 1);
    }
    setNext(current);
    setCurrent(previous);
    setPrevious((previous - 1 + allData?.length) % allData?.length);
  };
  // console.log(previous, current, next);
  const onReset = () => {
    window.location.reload();
  };

  const closeDeleteModal = () => {
    setOpenContactModal(false);
  };

  useEffect(() => {
    getAllData();
    getContactData();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const getAllData = () => {
    setLoader(true);
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/pages/getAllPages`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then((response) => {
        // console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          setAllData(response?.data?.pages);
          setDataLength(response?.data?.pages?.length - 1);
          // const mergedArray = response?.data?.pages.concat(staticPages);
          // setAllData(mergedArray);
          // setDataLength(mergedArray?.length - 1);
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error:", error);
      });
  };

  const handleHeadingClick = (page) => {
    if (page?.isSubpage) {
      getsubPageData(page);
    }
  };

  const getsubPageData = (main_page) => {
    setLoader(true);
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/subPages/subPages/${main_page?._id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          // console.log(response?.data?.subpages)
          if (
            Array.isArray(response?.data?.subpages) &&
            response?.data?.subpages.length > 0
          ) {
            setSubPagesData(response?.data?.subpages);
            setShow(true);
          }
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error:", error);
      });
  };

  const getContactData = (pageNo) => {
    setLoader(true);
    const options = {
      method: "GET",
      url: `${BASE_URL}/api/contacts/getAllContacts`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          setContactDetails(response?.data?.contacts);
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error:", error);
      });
  };
  const playAudio = () => {
    setIsMuted(false);
  };
  const playVideo_handler = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const playButton = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <>
      {isLoader && <Loader />}
      {Array.isArray(allData) && allData.length > 0 && (
        <div className={`containerImage `} onClick={playAudio}>
          <Header handleClick={onReset} data={contactDetails} />
          {!show ? (
            <>
              {/* -------------background video------------------ */}
              <video
                autoPlay
                // loop
                key={previous + 1}
                muted
                className={`background ${animate ? "animate-exit" : ""}`}
              >
                <source src={`${allData[previous]?.bgUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="overlay"></div>

              <video
                autoPlay
                // loop
                muted={isMuted}
                ref={videoRef}
                key={current + 2}
                preload="auto"
                onCanPlay={() => {
                  if (autoPlay && videoRef.current) {
                    videoRef.current.play();
                  } else if (videoRef.current && !autoPlay) {
                    videoRef.current.pause();
                  }
                }}
                className={`background ${animate ? "animate-enter" : ""}`}
              >
                <source src={allData[current]?.bgUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="w-[80%] mx-auto">
                {/* -------------heading 1------------------ */}
                <div
                  ref={exitingRef}
                  className={`headCont  ${
                    headanimate ? "header-exit" : "hidden"
                  }`}
                >
                  <h3 className="main-heading">{allData[previous]?.title} </h3>
                </div>

                <div
                  className={`headCont ${headanimate ? "header-enter" : ""}`}
                >
                  <h3 className="main-heading">{allData[current]?.title}</h3>
                </div>

                {/*------ heading two --------*/}

                <div>
                  <div
                    ref={exitingRef}
                    className={`headContTwo ${
                      headanimate ? "header-exit" : "hidden"
                    }`}
                  >
                    <h3 className="heading2">
                      <span>{allData[previous]?.subTitle}</span>
                    </h3>
                  </div>

                  <div
                    className={`headContTwo ${
                      headanimate ? "header-enter" : ""
                    }`}
                  >
                    <h3 className="heading2 flex md:gap-x-12 gap-x-6">
                      <span
                        className="cursor-pointer  hover:text-[#b3b3b3] transition-all ease-in-out delay-150 duration-300" // -------- for help desk modal
                      >
                        {allData[current]?.subTitle}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* -------------heading 3------------------ */}
                <div>
                  <div
                    ref={exitingRef}
                    className={`headContThree ${
                      headanimate ? "headerThree-exit" : "hidden"
                    }`}
                  >
                    <p className="heading3 cursor-pointer">
                      {allData[previous]?.paragraph}
                    </p>
                  </div>

                  <div
                    className={`headContThree ${
                      headanimate ? "headerThree-enter" : ""
                    }`}
                  >
                    <p
                      className={`heading3 ${
                        allData[current]?.isSubpage
                          ? "cursor-pointer hover:text-white transition-all ease-in-out delay-150 duration-300"
                          : ""
                      }`}
                      onClick={() => handleHeadingClick(allData[current])}
                    >
                      {allData[current]?.paragraph
                        ? allData[current]?.paragraph
                        : allData[current]?.isSubpage
                        ? "View"
                        : ""}
                    </p>
                  </div>
                </div>

                {/*--------- count -----------*/}
                <div className={`${myFont2.className}`}>
                  <div
                    ref={exitingRef}
                    className={`serialCount ${
                      headanimate ? "headerThree-exit" : "hidden"
                    }`}
                  >
                    <p>
                      {previous + 1 === 0
                        ? ""
                        : (previous + 1)?.toString()?.padStart(2, "0")}
                    </p>
                  </div>

                  <div
                    className={`serialCount ${
                      headanimate ? "headerThree-enter" : ""
                    }`}
                  >
                    <p>{(current + 1)?.toString()?.padStart(2, "0")}</p>
                  </div>
                </div>

                 {/*------------next button----------------- */}
              <button
                onClick={playButton}
                className={` play-btn icon-hover px-1 py-1 absolute  sm:bottom-[8%] z-[1]`}
              >
                {isPlaying ? (
                  <Image
                    src="/svg/pause.svg"
                    width={40}
                    height={40}
                    alt="pause"
                    className="lg:w-[48px] w-[38px] lg:h-[48px] h-[38px]"
                  />
                ) : (
                  <Image
                    src="/svg/play.svg"
                    width={40}
                    height={40}
                    alt="play"
                    className="lg:w-[48px] w-[38px] lg:h-[48px] h-[38px]"
                  />
                )}
              </button>
              </div>

              {/*------------next button----------------- */}
              <div className="flex absolute sm:bottom-[60px] gap-x-5">
                <button
                  onClick={prevBackground}
                  className={
                    current + 1 === 1
                      ? "hidden"
                      : " next-btn icon-hover prev-btn"
                  }
                >
                  <Image
                    src="/svg/arrow.svg"
                    width={30}
                    height={30}
                    alt="prev"
                    className=""
                  />
                </button>
                <button
                  onClick={changeBackground}
                  className={
                    current + 1 === allData?.length
                      ? " next-btn icon-hover"
                      : "next-btn icon-hover"
                  }
                >
                  <Image
                    src="/svg/arrow.svg"
                    width={30}
                    height={30}
                    alt="next"
                  />
                </button>
              </div>
             
            </>
          ) : (
            <Services
              setShow={setShow}
              subPagesData={subPagesData}
              isMuted={isMuted}
              contactDetails={contactDetails}
            />
          )}
        </div>
      )}

      <Transition appear show={defaultModal} as={Fragment} onClose={() => {}}>
        <Dialog
          as="div"
          className="relative z-[111] bg-black/70"
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full 2xl:max-w-[1100px] xl:max-w-[1000px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-black py-10 px-[10px] xl:px-12 md:px-4 text-center align-middle shadow-xl transition-all relative">
                  <div
                    className="w-full cursor-pointer text-center flex items-center gap-3 justify-center text-white"
                    onClick={() => {
                      setDefaultModal(false);
                      setIsMuted(false);
                      playVideo_handler();
                      setAutoPlay(true);
                      setIsOpenPrivacy(false);
                      setIsPlaying(true)
                    }}
                  >
                    WAIT! Stay informed and up to date with our latest content
                    by signing up for our monthly newsletter... We'll even give
                    you 10% off your first order for joining{" "}
                    <span className="text-[30px]">→</span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenPrivacy} as={Fragment}>
        <Dialog as="div" className="relative z-[111]" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full 2xl:max-w-[600px] xl:max-w-[600px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-black py-10 px-[10px] xl:px-12 md:px-4 text-center align-middle shadow-xl transition-all relative">
                  <div
                    className="w-full cursor-pointer text-center flex flex-col items-center gap-3 justify-center text-white"
                    // onClick={() => setOpenEmail(false)}
                  >
                    <p className="mb-6 text-[18px] ">Terms and Conditions</p>
                    <button
                      type="submit"
                      className="w-[200px] bg-[#1f2432] font-medium border hover:border-transparent text-white p-2 rounded-lg  hover:border hover:border-gray-300 h-[50px] login-btn"
                      onClick={() => {
                        setDefaultModal(true);
                        setIsOpenPrivacy(false);
                      }}
                    >
                      Agree
                    </button>
                  </div>
                  {/* <EmailPopup /> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MainPage;
