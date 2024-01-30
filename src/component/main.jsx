"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

import Header from "./header/Header";
import Services from "./services/Services";
import { myFont2 } from "../app/font";
import { BASE_URL } from "./config";
import Loader from "./websiite-loader/Index";

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
  const [defaultModal, setDefaultModal] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(true);
  const [isRotate, setIsRotate] = useState(false);
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
    getTranscription();
  };

  const prevBackground = () => {
    setHeadanimate(true);
    setAnimate(true);
    setNext(current);
    setCurrent(previous);
    setPrevious((previous - 1 + allData?.length) % allData?.length);
    // getTranscription()
  };
  const onReset = () => {
    window.location.reload();
  };

  const playAudio = () => {
    setIsMuted(false);
  };
  const playVideo_handler = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
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
        if (response.status === 200) {
          setLoader(false);
          setAllData(response?.data?.pages);
          setDataLength(response?.data?.pages?.length - 1);
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

  const handleOrientationChange = () => {
    if (typeof window !== "undefined" && "orientation" in screen) {
      const screenOrientation =
        screen.orientation || screen.mozOrientation || screen.msOrientation;

      if (screenOrientation) {
        const { type } = screenOrientation;

        if (type.includes("portrait")) {
          console.log("Portrait Mode");
          setIsRotate(true);
          pauseVideo();
        } else {
          console.log("Landscape Mode");
          setIsRotate(false);

          if (videoRef.current && autoPlay) {
            videoRef.current.play();
          }
        }
      }
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    handleOrientationChange();

    if (typeof window !== "undefined" && "orientation" in screen) {
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    return () => {
      if (typeof window !== "undefined" && "orientation" in screen) {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      }
    };
  }, [isRotate]);

  function getTranscription() {
    const filename = allData[current]?.bgUrl;
    axios
      .get(`${BASE_URL}/api/transcribe?filename=${filename}`)
      .then((response) => {
        console.log(response);
        if (response.status === "IN_PROGRESS") {
        } else {
        }
      });
  }
  return (
    <>
      <div className="co_create_group">
        {isLoader && <Loader />}
        {Array.isArray(allData) && allData.length > 0 && (
          <>
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
                    <source
                      src={`${allData[previous]?.bgUrl}`}
                      type="video/mp4"
                    />
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
                      <h3 className="main-heading">
                        {allData[previous]?.title}{" "}
                      </h3>
                    </div>

                    <div
                      className={`headCont ${
                        headanimate ? "header-enter" : ""
                      }`}
                    >
                      <h3 className="main-heading">
                        {allData[current]?.title}
                      </h3>
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
                  </div>

                  {/*------------next button----------------- */}
                  <div className="flex absolute bottom-[10%] sm:bottom-[60px] gap-x-5 next">
                    <button
                      onClick={prevBackground}
                      className={
                        current + 1 === 1
                          ? "hidden"
                          : "prev-btn  next-btn icon-hover "
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
          </>
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
                      }}
                    >
                      WAIT! Stay informed and up to date with our latest content
                      by signing up for our monthly newsletter... We'll even
                      give you 10% off your first order for joining{" "}
                      <span className="text-[30px]">→</span>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={isOpenPrivacy} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[111] co_create_group"
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
                    <div className="w-full cursor-pointer text-justify  flex flex-col items-center gap-3 justify-center text-white">
                      <p className="mb-2 text-[18px] ">Terms and Conditions</p>
                      <div className="h-[70vh] overflow-y-auto">
                        <section className="mb-2 mr-3">
                          <h2 className="text-[13px]">
                            Agreement between User and{" "}
                            <a
                              className="border-none focus-visible:outline-none underline"
                              href="https://thecocreategroup.org"
                              target="_blank"
                            >
                              thecocreategroup.org
                            </a>{" "}
                            <br />
                          </h2>
                          <p className="text-[12px] ">
                            Welcome to thecocreategroup.org. The{" "}
                            <a
                              className="border-none focus-visible:outline-none underline"
                              href="https://thecocreategroup.org"
                              target="_blank"
                            >
                              thecocreategroup.org
                            </a>{" "}
                            website (the "Site") is comprised of various web
                            pages operated by TrAIned OSAI ("TrAIned OSAI").{" "}
                            <a
                              className="border-none focus-visible:outline-none underline"
                              href="https://thecocreategroup.org"
                              target="_blank"
                            >
                              thecocreategroup.org
                            </a>{" "}
                            is offered to you conditioned on your acceptance
                            without modification of the terms, conditions, and
                            notices contained herein (the "Terms"). Your use of
                            thecocreategroup.org constitutes your agreement to
                            all such Terms. Please read these terms carefully,
                            and keep a copy of them for your reference.{" "}
                            <a
                              className="border-none focus-visible:outline-none underline"
                              href="https://thecocreategroup.org"
                              target="_blank"
                            >
                              thecocreategroup.org
                            </a>{" "}
                            is an Informational Site providing information and
                            contact details, sharing news, offering elements for
                            educational or other business-related purposes.
                          </p>
                        </section>
                        <section className="mb-2 mr-3">
                          <h2 className="text-[13px]">
                            Electronic Communications
                          </h2>
                          <p className="text-[12px] ">
                            Visiting{" "}
                            <a
                              className="border-none focus-visible:outline-none underline"
                              href="https://thecocreategroup.org"
                              target="_blank"
                            >
                              thecocreategroup.org
                            </a>
                            or sending emails to TrAIned OSAI constitutes
                            electronic communications. You consent to receive
                            electronic communications and you agree that all
                            agreements, notices, disclosures, and other
                            communications that we provide to you
                            electronically, via email and on the Site, satisfy
                            any legal requirement that such communications be in
                            writing.
                          </p>
                        </section>
                        <section className="mb-2 mr-3">
                          <h2 className="text-[13px]">
                            Children Under Thirteen
                          </h2>
                          <p className="text-[12px]">
                            TrAIned OSAI does not knowingly collect, either
                            online or offline, personal information from persons
                            under the age of thirteen. If you are under 18, you
                            may use{" "}
                            <a
                              className="border-none focus-visible:outline-none underline"
                              href="https://thecocreategroup.org"
                              target="_blank"
                            >
                              thecocreategroup.org
                            </a>{" "}
                            only with the permission of a parent or guardian.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">
                            Cancellation/Refund Policy
                          </h2>
                          <p>
                            You may cancel your service or purchase at any time.
                            Any cancellations made after 60 days of service or
                            use will not qualify for a refund. Please contact us
                            at{" "}
                            <a href="info@thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                              info@thecocreategroup.org
                            </a>{" "}
                            with any questions.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">
                            Links to Third Party Sites/Third Party Services
                          </h2>
                          <p>
                            <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                              thecocreategroup.org
                            </a>{" "}
                            may contain links to other websites ("Linked
                            Sites"). The Linked Sites are not under the control
                            of TrAIned OSAI, and TrAIned OSAI is not responsible
                            for the contents of any Linked Site, including
                            without limitation any link contained in a Linked
                            Site, or any changes or updates to a Linked Site.
                            TrAIned OSAI is providing these links to you only as
                            a convenience, and the inclusion of any link does
                            not imply endorsement by TrAIned OSAI of the site or
                            any association with its operators. Certain services
                            made available via{" "}
                            <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                              thecocreategroup.org
                            </a>{" "}
                            are delivered by third party sites and
                            organizations. By using any product, service, or
                            functionality originating from the{" "}
                            <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                              thecocreategroup.org
                            </a>{" "}
                            domain, you hereby acknowledge and consent that
                            TrAIned OSAI may share such information and data
                            with any third party with whom TrAIned OSAI has a
                            contractual relationship to provide the requested
                            product, service, or functionality on behalf of
                            <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                              thecocreategroup.org
                            </a>{" "}
                            users and customers.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">
                            No Unlawful or Prohibited Use/Intellectual Property
                          </h2>
                          <p>
                            You are granted a non-exclusive, non-transferable,
                            revocable license to access and use <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                              thecocreategroup.org
                            </a>{" "}
                            strictly in accordance with these terms of use. As a
                            condition of your use of the Site, you warrant to
                            TrAIned OSAI that you will not use the Site for any
                            purpose that is unlawful or prohibited by these
                            Terms. You may not use the Site in any manner that
                            could damage, disable, overburden, or impair the
                            Site or interfere with any other party's use and
                            enjoyment of the Site. You may not obtain or attempt
                            to obtain any materials or information through any
                            means not intentionally made available or provided
                            for through the Site. All content included as part
                            of the Service, such as text, graphics, logos,
                            images, as well as the compilation thereof, and any
                            software used on the Site, is the property of
                            TrAIned OSAI or its suppliers and protected by
                            copyright and other laws that protect intellectual
                            property and proprietary rights. You agree to
                            observe and abide by all copyright and other
                            proprietary notices, legends, or other restrictions
                            contained in any such content and will not make any
                            changes thereto. You will not modify, publish,
                            transmit, reverse engineer, participate in the
                            transfer or sale, create derivative works, or in any
                            way exploit any of the content, in whole or in part,
                            found on the Site. TrAIned OSAI’s content is not for
                            resale. Your use of the Site does not entitle you to
                            make any unauthorized use of any protected content,
                            and in particular, you will not delete or alter any
                            proprietary rights or attribution notices in any
                            content. You will use protected content solely for
                            your personal use and will make no other use of the
                            content without the express written permission of
                            TrAIned OSAI and the copyright owner. You agree that
                            you do not acquire any ownership rights in any
                            protected content. We do not grant you any licenses,
                            express or implied, to the intellectual property of
                            TrAIned OSAI or our licensors except as expressly
                            authorized by these Terms.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">International Users</h2>
                          <p>
                            The Service is controlled, operated, and
                            administered by TrAIned OSAI from our offices within
                            the USA. If you access the Service from a location
                            outside the USA, you are responsible for compliance
                            with all local laws. You agree that you will not use
                            the Content accessed through <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline"> 
                              thecocreategroup.org
                            </a>
                            in any country or in any manner prohibited by any
                            applicable laws, restrictions, or regulations.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">Indemnification</h2>
                          <p>
                            You agree to indemnify, defend, and hold harmless
                            TrAIned OSAI, its officers, directors, employees,
                            agents, and third parties, for any losses, costs,
                            liabilities, and expenses (including reasonable
                            attorney's fees) relating to or arising out of your
                            use of or inability to use the Site or services, any
                            user postings made by you, your violation of any
                            terms of this Agreement or your violation of any
                            rights of a third party, or your violation of any
                            applicable laws, rules, or regulations. TrAIned OSAI
                            reserves the right, at its own cost, to assume the
                            exclusive defense and control of any matter
                            otherwise subject to indemnification by you, in
                            which event you will fully cooperate with TrAIned
                            OSAI in asserting any available defenses.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">Arbitration</h2>
                          <p>
                            In the event the parties are not able to resolve any
                            dispute between them arising out of or concerning
                            these Terms and Conditions, or any provisions
                            hereof, whether in contract, tort, or otherwise at
                            law or in equity for damages or any other relief,
                            then such dispute shall be resolved only by final
                            and binding arbitration pursuant to the Federal
                            Arbitration Act, conducted by a single neutral
                            arbitrator and administered by the American
                            Arbitration Association, or a similar arbitration
                            service selected by the parties, in a location
                            mutually agreed upon by the parties. The
                            arbitrator's award shall be final, and judgment may
                            be entered upon it in any court having jurisdiction.
                            In the event that any legal or equitable action,
                            proceeding, or arbitration arises out of or concerns
                            these Terms and Conditions, the prevailing party
                            shall be entitled to recover its costs and
                            reasonable attorney's fees. The parties agree to
                            arbitrate all disputes and claims in regards to
                            these Terms and Conditions or any disputes arising
                            as a result of these Terms and Conditions, whether
                            directly or indirectly, including Tort claims that
                            are a result of these Terms and Conditions. The
                            parties agree that the Federal Arbitration Act
                            governs the interpretation and enforcement of this
                            provision. The entire dispute, including the scope
                            and enforceability of this arbitration provision,
                            shall be determined by the Arbitrator. This
                            arbitration provision shall survive the termination
                            of these Terms and Conditions.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">Class Action Waiver</h2>
                          <p>
                            Any arbitration under these Terms and Conditions
                            will take place on an individual basis; class
                            arbitrations and class/representative/collective
                            actions are not permitted. THE PARTIES AGREE THAT A
                            PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN
                            EACH'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF
                            OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE,
                            AND/OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE
                            FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST
                            THE OTHER. Further, unless both you and TrAIned OSAI
                            agree otherwise, the arbitrator may not consolidate
                            more than one person's claims and may not otherwise
                            preside over any form of a representative or class
                            proceeding.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">Liability Disclaimer</h2>
                          <p>
                            THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES
                            INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY
                            INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS.
                            CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION
                            HEREIN. TrAIned OSAI AND/OR ITS SUPPLIERS MAY MAKE
                            IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.
                            TrAIned OSAI AND/OR ITS SUPPLIERS MAKE NO
                            REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY,
                            AVAILABILITY, TIMELINESS, AND ACCURACY OF THE
                            INFORMATION, SOFTWARE, PRODUCTS, SERVICES, AND
                            RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY
                            PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY
                            APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE,
                            PRODUCTS, SERVICES, AND RELATED GRAPHICS ARE
                            PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF
                            ANY KIND. TrAIned OSAI AND/OR ITS SUPPLIERS HEREBY
                            DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD
                            TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES,
                            AND RELATED GRAPHICS, INCLUDING ALL IMPLIED
                            WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS
                            FOR A PARTICULAR PURPOSE, TITLE, AND
                            NON-INFRINGEMENT. TO THE MAXIMUM EXTENT PERMITTED BY
                            APPLICABLE LAW, IN NO EVENT SHALL TrAIned OSAI
                            AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT,
                            INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
                            CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
                            INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF
                            USE, DATA, OR PROFITS, ARISING OUT OF OR IN ANY WAY
                            CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE,
                            WITH THE DELAY OR INABILITY TO USE THE SITE OR
                            RELATED SERVICES, THE PROVISION OF OR FAILURE TO
                            PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE,
                            PRODUCTS, SERVICES, AND RELATED GRAPHICS OBTAINED
                            THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE
                            USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT,
                            NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, EVEN IF
                            TrAIned OSAI OR ANY OF ITS SUPPLIERS HAS BEEN
                            ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME
                            STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR
                            LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR
                            INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT
                            APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY
                            PORTION OF THE SITE OR WITH ANY OF THESE TERMS OF
                            USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO
                            DISCONTINUE USING THE SITE.
                          </p>
                        </section>
                        <section className="mb-2 text-[12px] mr-3">
                          <h2 className="text-[13px]">
                            Termination/Access Restriction
                          </h2>
                          <p>
                            TrAIned OSAI reserves the right, in its sole
                            discretion, to terminate your access to the Site and
                            the related services or any portion thereof at any
                            time, without notice. To the maximum extent
                            permitted by law, this agreement is governed by the
                            laws of the Commonwealth of Pennsylvania, and you
                            hereby consent to the exclusive jurisdiction and
                            venue of courts in Pennsylvania in all disputes
                            arising out of or relating to the use of the Site.
                            Use of the Site is unauthorized in any jurisdiction
                            that does not give effect to all provisions of these
                            Terms, including, without limitation, this section.
                            You agree that no joint venture, partnership,
                            employment, or agency relationship exists between
                            you and TrAIned OSAI as a result of this agreement
                            or use of the Site. TrAIned OSAI's performance of
                            this agreement is subject to existing laws and legal
                            process, and nothing contained in this agreement is
                            in derogation of TrAIned OSAI's right to comply with
                            governmental, court, and law enforcement requests or
                            requirements relating to your use of the Site or
                            information provided to or gathered by TrAIned OSAI
                            with respect to such use. If any part of this
                            agreement is determined to be invalid or
                            unenforceable pursuant to applicable law, including,
                            but not limited to, the warranty disclaimers and
                            liability limitations set forth above, then the
                            invalid or unenforceable provision will be deemed
                            superseded by a valid, enforceable provision that
                            most closely matches the intent of the original
                            provision, and the remainder of the agreement shall
                            continue in effect. Unless otherwise specified
                            herein, this agreement constitutes the entire
                            agreement between the user and TrAIned OSAI with
                            respect to the Site, and it supersedes all prior or
                            contemporaneous communications and proposals,
                            whether electronic, oral, or written, between the
                            user and TrAIned OSAI with respect to the Site. A
                            printed version of this agreement and of any notice
                            given in electronic form shall be admissible in
                            judicial or administrative proceedings based upon or
                            relating to this agreement to the same extent and
                            subject to the same conditions as other business
                            documents and records originally generated and
                            maintained in printed form. It is the express wish
                            of the parties that this agreement and all related
                            documents be written in English.
                          </p>
                        </section>
                        <section className="mb-3 text-[12px] mr-3">
                          Changes to Terms TrAIned OSAI reserves the right, in
                          its sole discretion, to change the Terms under which{" "}
                          <a href="https://thecocreategroup.org" className="border-none focus-visible:outline-none underline">
                            thecocreategroup.org
                          </a>{" "}
                          is offered. The most current version of the Terms will
                          supersede all previous versions. TrAIned OSAI
                          encourages you to periodically review the Terms to
                          stay informed of our updates.
                        </section>
                      </div>
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Transition appear show={isRotate} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[111]"
            id="rotate_message"
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
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center bg-[#000000de]">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full 2xl:max-w-[600px] xl:max-w-[600px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-white py-10 px-[10px] xl:px-12 md:px-4 text-center align-middle shadow-xl transition-all relative">
                    <div
                      className="w-full cursor-pointer text-center flex flex-col items-center gap-3 justify-center text-black"
                      // onClick={() => setOpenEmail(false)}
                    >
                      <div className="">
                        <div className="">
                          <Image
                            src="/svg/rotate1.svg"
                            alt="rotate"
                            height={200}
                            width={200}
                          />
                        </div>

                        <button className="font-medium mt-6">
                          Please rotate your screen
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default MainPage;
