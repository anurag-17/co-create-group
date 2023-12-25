"use client";
import Image from "next/image";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import video1 from "../../public/video1.mp4";
import video2 from "../../public/video2.mp4";
import video3 from "../../public/video3.mp4";
import video4 from "../../public/video4.mp4";
import Header from "./header/Header";
import Services from "./services/Services";
import { myFont2 } from "../app/font";
import ContactDetails from "./modal/ContactDetails";
import EmailPopup from "./modal/EmailPopup";

const backgrounds = [video1, video2, video3, video4];

const headings = ["ABOUT US", "SERVICES", "CONTACT US", "HELP AND FAQS"];

const headingtwo = ["", "", "I'm Ready!", "Help Desk "];
const headingThree = [
  "WHO ARE WE?",
  "WHAT DO WE DO",
  "LETS CONNECT!",
  "SUPPORT",
];

const New = () => {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);
  const exitingRef = useRef();
  const [headanimate, setHeadanimate] = useState(false);
  const [show, setShow] = useState(false);
  let [openContactModal, setOpenContactModal] = useState(false);
  let [openEmail, setOpenEmail] = useState(false);

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
    setNext((next + 1) % backgrounds.length);
  };

  const onReset = () => {
    setCurrent(0);
    setPrevious(0);
    setNext(1);
    setAnimate(true);
    setHeadanimate(true);
    setShow(false);
  };

  const handleHeadingClick = () => {
    if (current == 1) {
      setShow(true);
      console.log(current);
    }
  };

  const closeDeleteModal = () => {
    setOpenContactModal(false);
  };

  return (
    <>
      {/* <button onClick={changeBackground}>Change Background</button> */}
      <div className={`containerImage `}>
        <Header handleClick={onReset} />
        {!show ? (
          <>
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

            <div className="w-[80%] mx-auto">
              <div
                ref={exitingRef}
                className={`headCont  ${
                  headanimate ? "header-exit" : "hidden"
                }`}
              >
                <h3 className="main-heading">{headings[previous]}</h3>
              </div>

              <div className={`headCont ${headanimate ? "header-enter" : ""}`}>
                <h3 className="main-heading">{headings[current]}</h3>
              </div>

              {/* heading two */}

              <div>
                <div
                  ref={exitingRef}
                  className={`headContTwo ${
                    headanimate ? "header-exit" : "hidden"
                  }`}
                >
                  <h3 className="heading2">
                    {previous === 2 ? (
                      <span>{headingtwo[previous]}</span>
                    ) : (
                      headingtwo[previous]
                    )}
                  </h3>
                </div>

                <div
                  className={`headContTwo ${headanimate ? "header-enter" : ""}`}
                >
                  <h3 className="heading2 flex md:gap-x-12 gap-x-6">
                    {current === 3 ? (
                      <>
                        <span
                          onClick={() => {
                            alert("modal one");
                          }}
                        >
                          {headingtwo[current]}
                        </span>
                        <span
                          onClick={() => {
                            alert("modal two");
                          }}
                        >
                          FAQs
                        </span>
                      </>
                    ) : (
                      headingtwo[current]
                    )}
                  </h3>
                </div>
              </div>
              <div>
                <div
                  ref={exitingRef}
                  className={`headContThree ${
                    headanimate ? "headerThree-exit" : "hidden"
                  }`}
                >
                  <p className="heading3 cursor-pointer">
                    {headingThree[previous]}
                  </p>
                </div>

                <div
                  className={`headContThree ${
                    headanimate ? "headerThree-enter" : ""
                  }`}
                >
                  <p
                    className="heading3 cursor-pointer"
                    onClick={handleHeadingClick}
                  >
                    {headingThree[current]}
                  </p>
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
            </div>

            {/* button */}
            <button
              onClick={changeBackground}
              className={
                current + 1 === backgrounds?.length
                  ? "btnRotate next-btn"
                  : "next-btn"
              }
            >
              <Image src="/svg/arrow.svg" width={30} height={30} alt="next" />
            </button>
          </>
        ) : (
          <Services setShow={setShow} />
        )}
      </div>

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
                <Dialog.Panel className="w-full 2xl:max-w-[1100px] xl:max-w-[1000px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-white py-10 px-[10px] xl:px-12 md:px-4 text-left align-middle shadow-xl transition-all relative">
                  <div
                    className="absolute right-[25px] top-[20px] cursor-pointer "
                    onClick={closeDeleteModal}
                  >
                    <Image
                      src="/svg/close.svg"
                      alt="close"
                      height={20}
                      width={20}
                    />
                  </div>
                  <ContactDetails />
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

export default New;
