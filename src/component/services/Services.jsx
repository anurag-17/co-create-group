"use client";
import Image from "next/image";
import React, { Fragment ,useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { myFont2 } from "@/app/font";
import ContactDetails from "../modal/ContactDetails";
import EmailPopup from "../modal/EmailPopup";


const Services = ({ setShow, subPagesData, isMuted,contactDetails }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [animate, setAnimate] = useState(true);
  const exitingRef = useRef();
  const [headanimate, setHeadanimate] = useState(true);
  const [isMutedPage, setIsMutedPage] = useState(isMuted);
  const videoRef = useRef(null);

  // popup
  const [openContactModal, setOpenContactModal] = useState(false);

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

  const prevBackgroundVid = () => {
    setHeadanimate(true);
    setAnimate(true);
  
    if (previousPage >= 0) {
      setPreviousPage(prev => prev - 1);
      setCurrentPage(prev => prev - 1);
      setNextPage(prev => prev - 1);
    }
  };
  
  const playAudio = () => {
    setIsMutedPage(false);
  };

  const handleClickOpen = (title) => {
    // console.log(title.toLowerCase().trim() == "help and faqs")
    
    if (title?.toLowerCase()?.trim()  == "contact us") {
      //  alert(title)
      setOpenContactModal(true)
    }
    else if(title.toLowerCase().trim() == "help and faqs"){
      // alert(title)
      return
    }
    else{
      return
    }
  };

  const closeDeleteModal = () => {
    setOpenContactModal(false);
  };



  return (
    <>
      {/* <button onClick={changeBackgroundVid}>Change Background</button> */}
      {/* <Header handleClick={onReset} /> */}
      <video
        // ref={videoRef}
        autoPlay
        key={previousPage + 1}
        muted
        preload="auto"
        className={`background ${animate ? "animate-exit" : ""}`}
      >
        <source src={subPagesData[previousPage]?.bgUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay"></div>

      <video
        autoPlay
        muted={isMutedPage}
        ref={videoRef}
        key={currentPage + 2}
        preload="auto"
        className={`background ${animate ? "animate-enter" : ""}`}
      >
        <source src={subPagesData[currentPage]?.bgUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* -------------heading 1------------------ */}
      <div className="container" onClick={playAudio}>
        <div
          className="flex gap-2 absolute z-10 top-[13%] text-[white] 2xl:text-[16px] text-[12px] font-bold leading-[26px] cursor-pointer"
          onClick={() => setShow(false)}
        >
          <Image src="/svg/left-arrow.svg" alt="back" height={16} width={16} />
          Back
        </div>
        <div
          ref={exitingRef}
          className={`headCont  ${headanimate ? "header-exit" : "hidden"}`}
        >
          <h3 className="main-heading main-head2">
            {subPagesData[previousPage]?.title}
          </h3>
        </div>

        <div className={`headCont ${headanimate ? "header-enter" : ""}`}>
          <h3 className="main-heading main-head2">
            {subPagesData[currentPage]?.title}
          </h3>
        </div>

        {/*------ heading two --------*/}

        {/* <div>
          <div
            ref={exitingRef}
            className={`headContTwo ${headanimate ? "header-exit" : "hidden"}`}
          >
            <h3 className="heading2">
               {subPagesData[previousPage]?.subTitle}
            </h3>
          </div>

          <div className={`headContTwo ${headanimate ? "header-enter" : ""}`}>
            <h3 className="heading2 flex md:gap-x-12 gap-x-6">
            <span
                    className="cursor-pointer  hover:text-[#b3b3b3] transition-all ease-in-out delay-150 duration-300" // -------- for help desk modal
                    // onClick={() => {
                    //   alert("modal one");
                    // }}
                  >
                    {subPagesData[currentPage]?.subTitle}
                  </span>
            </h3>
          </div>
        </div> */}
        {/* -------------heading 3------------------ */}
        <div>
          <div
            ref={exitingRef}
            className={`sub-headContThree ${
              headanimate ? "headerThree-exit" : "hidden"
            }`}
          >
            <p className="heading3">{subPagesData[previousPage]?.paragraph}</p>
          </div>

          <div
            className={`sub-headContThree ${
              headanimate ? "headerThree-enter" : ""
            }`}

            onClick={()=>handleClickOpen(subPagesData[currentPage]?.title)}
          >
            <p className="heading3 flex gap-x-5">
              <span className="cursor-pointer">{subPagesData[currentPage]?.paragraph}</span>
              {
              subPagesData[currentPage]?.paragraph?.toLowerCase()?.trim() == "help desk" &&
              <span  className="cursor-pointer">FAQs</span>
            }
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
              {previousPage + 1 === 0
                ? ""
                : (previousPage + 1)?.toString()?.padStart(2, "0")}
            </p>
          </div>

          <div
            className={`serialCount ${headanimate ? "headerThree-enter" : ""}`}
          >
            <p>{(currentPage + 1)?.toString()?.padStart(2, "0")}</p>
          </div>
        </div>
      </div>

      {/*------------next button----------------- */}
      {
        subPagesData?.length>1 &&
      <div className="flex absolute bottom-[60px] gap-x-5">
                <button
                  onClick={prevBackgroundVid}
                  className={
                    currentPage + 1 === 1
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
                  onClick={changeBackgroundVid}
                  className={
                    currentPage + 1 === subPagesData?.length
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
   }
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

    </>
  );
};

export default Services;
