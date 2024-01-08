"use client";
import Image from "next/image";
import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

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
    subTitle: "I'm Ready!",
    isSubpage: false,
    paragraph: "LETS CONNECT",
    bgUrl:
      "https://exerciseimage.s3.ap-south-1.amazonaws.com/2023-12-27/video1.mp4",
  },
  {
    title: "HELP AND FAQS",
    subTitle: "Help Desk",
    isSubpage: false,
    paragraph: "SUPPORT",
    bgUrl:
      "https://exerciseimage.s3.ap-south-1.amazonaws.com/2023-12-27/video1.mp4",
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
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [allData, setAllData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [subPagesData, setSubPagesData] = useState([]);
  const [isMuted, setIsMuted] = useState(true)
  const [contactDetails, setContactDetails] = useState([]);
  const videoRef = useRef(null);
  const [defaultModal, setDefaultModal] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)

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
    setHeadanimate(true);
    setAnimate(true);
    setPrevious(next - 1);
    setCurrent(next);
    setNext((next + 1) % allData?.length);
  };

  const onReset = () => {
    setCurrent(0);
    setPrevious(0);
    setNext(1);
    setAnimate(true);
    setHeadanimate(true);
    setShow(false);
  };


  const closeDeleteModal = () => {
    setOpenContactModal(false);
  };

  useEffect(() => {
    setDefaultModal(true)
    getAllData();
    getContactData()
   
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
        console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          const mergedArray = response?.data?.pages.concat(staticPages);
          setAllData(mergedArray);
          setDataLength(mergedArray?.length - 1);
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
      getsubPageData(page)
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
          if (Array.isArray(response?.data?.subpages) && response?.data?.subpages.length > 0) {
            setSubPagesData(response?.data?.subpages);
            setShow(true)
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
    setIsMuted(false)
  }
  const playVideo_handler = () =>{
    if (videoRef.current) {
      videoRef.current.play();
    }
  }

  return (
    <>
      {isLoader && <Loader />}
      {Array.isArray(allData) && allData.length > 0 && (
        <div className={`containerImage `} onClick={playAudio}>
          <Header handleClick={onReset} />
          {!show ? (
            <>
              {/* -------------background video------------------ */}
              <video
                autoPlay
                loop
                key={previous + 1}
                muted
                className={`background ${animate ? "animate-exit" : ""}`}
              >
                <source src={allData[previous]?.bgUrl + '?v=' + new Date().getTime()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="overlay"></div>

              <video
                autoPlay
                loop
                muted={isMuted}
                ref={videoRef}
                key={current + 2}
                onCanPlay={() => {
                  if (autoPlay && videoRef.current) {
                    videoRef.current.play();
                  }
                  else if(videoRef.current && !autoPlay) {
                    
                    videoRef.current.pause();
                  }
                  
                }}
                className={`background ${animate ? "animate-enter" : ""}`}
              >
                <source src={allData[current]?.bgUrl + '?v=' + new Date().getTime()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="w-[80%] mx-auto">
                {/* -------------heading 1------------------ */}
                <div
                  ref={exitingRef}
                  className={`headCont  ${headanimate ? "header-exit" : "hidden"
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
                    className={`headContTwo ${headanimate ? "header-exit" : "hidden"
                      }`}
                  >
                    <h3 className="heading2">
                      {previous === dataLength - 1 ? (
                        <span>{allData[previous]?.subTitle}</span>
                      ) : (
                        allData[previous]?.subTitle
                      )}
                    </h3>
                  </div>

                  <div
                    className={`headContTwo ${headanimate ? "header-enter" : ""
                      }`}
                  >
                    <h3 className="heading2 flex md:gap-x-12 gap-x-6">
                      {current === dataLength ? (
                        <>
                          <span className="cursor-pointer  hover:text-[#b3b3b3] transition-all ease-in-out delay-150 duration-300"  // -------- for help desk modal
                          // onClick={() => {
                          //   alert("modal one");
                          // }}
                          >
                            {allData[current]?.subTitle}
                          </span>
                          <span className="cursor-pointer hover:text-[#b3b3b3] transition-all ease-in-out delay-150 duration-300"   // -------- for faq modal
                          // onClick={() => {
                          //   alert("modal two");
                          // }}
                          >
                            FAQs
                          </span>
                        </>
                      ) : current === dataLength - 1 ? (    // -------- for contact page modal
                        <span className="cursor-pointer hover:text-[#b3b3b3] transition-all ease-in-out delay-150 duration-300"
                          onClick={() => setOpenContactModal(true)}
                        >
                          {allData[current]?.subTitle}
                        </span>
                      ) : (
                        allData[current]?.subTitle
                      )}
                    </h3>
                  </div>
                </div>

                {/* -------------heading 3------------------ */}
                <div>
                  <div
                    ref={exitingRef}
                    className={`headContThree ${headanimate ? "headerThree-exit" : "hidden"
                      }`}
                  >
                    <p className="heading3 cursor-pointer">
                      {allData[previous]?.paragraph}
                    </p>
                  </div>

                  <div
                    className={`headContThree ${headanimate ? "headerThree-enter" : ""
                      }`}
                  >
                    <p
                      className={`heading3 ${allData[current]?.isSubpage ? "cursor-pointer hover:text-white transition-all ease-in-out delay-150 duration-300" : ""}`}
                      onClick={() => handleHeadingClick(allData[current])}
                    >
                      {(allData[current]?.paragraph) ? (allData[current]?.paragraph) : (allData[current]?.isSubpage) ? "View" : ""}
                    </p>
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
                      {previous + 1 === 0
                        ? ""
                        : (previous + 1)?.toString()?.padStart(2, "0")}
                    </p>
                  </div>

                  <div
                    className={`serialCount ${headanimate ? "headerThree-enter" : ""
                      }`}
                  >
                    <p>{(current + 1)?.toString()?.padStart(2, "0")}</p>
                  </div>
                </div>
              </div>

              {/*------------next button----------------- */}
              <button
                onClick={changeBackground}
                className={
                  current + 1 === allData?.length
                    ? "btnRotate next-btn icon-hover"
                    : "next-btn icon-hover"
                }
              >
                <Image src="/svg/arrow.svg" width={30} height={30} alt="next" />
              </button>
            </>
          ) : (
            <Services setShow={setShow} subPagesData={subPagesData} isMuted = {isMuted}/>
          )}
        </div>
      )}

      
      <Transition appear show={defaultModal} as={Fragment} onClose = {()=>{}}>
        <Dialog
          as="div"
          className="relative z-[111] bg-black/70"
          onClose={()=>{
          }}
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
                <Dialog.Panel className="w-full 2xl:max-w-[1100px] xl:max-w-[1000px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-black/70 py-10 px-[10px] xl:px-12 md:px-4 text-center align-middle shadow-xl transition-all relative">
                  <div
                    className="w-full cursor-pointer text-center flex items-center gap-3 justify-center text-white"
                    onClick={() =>   {
                      setDefaultModal(false)
                      setIsMuted(false)
                      playVideo_handler()
                      setAutoPlay(true)
                    }}
                  >
                    Welcome to Co-Create-Group <span className="text-[30px]">→</span>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
{/*------ contat details ------*/}
      <Transition appear show={openContactModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[111]"
          onClose={closeDeleteModal}
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
                <Dialog.Panel className="w-full 2xl:max-w-[1100px] xl:max-w-[1000px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-white py-10 px-[10px] xl:px-12 md:px-4 text-left align-middle shadow-xl transition-all relative">
                  <div
                    className="absolute right-[25px] top-[20px] cursor-pointer "
                    onClick={() => setOpenContactModal(false)}
                  >
                    <Image
                      src="/svg/close.svg"
                      alt="close"
                      height={20}
                      width={20}
                    />
                  </div>
                  <ContactDetails contactDetails={contactDetails} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* // Email */}
      <Transition appear show={openEmail} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[111]"
          onClose={closeDeleteModal}
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
                <Dialog.Panel className="w-full 2xl:max-w-[800px] sm:max-w-[700px] transform overflow-hidden rounded-[30px] bg-white py-10 md:px-12 px-4 text-left align-middle shadow-xl transition-all relative">
                  <div
                    className="absolute right-[25px] top-[20px] cursor-pointer "
                    onClick={() => setOpenEmail(false)}
                  >
                    <Image
                      src="/svg/close.svg"
                      alt="close"
                      height={20}
                      width={20}
                    />
                  </div>
                  <EmailPopup />
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
