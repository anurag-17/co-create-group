import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Email from "../modal/svg/Email";
import Location from "../modal/svg/Location";
import Phone from "../modal/svg/Phone";

const Header = ({ handleClick, data }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const encodedAddress = encodeURIComponent(data[0]?.address);
  const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`;

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const contactData = [
    {
      label: "phone",
      url: <Phone />,
      info: data ? data[0]?.number : "+89 8974 4895 586",
    },
    {
      label: "email",
      url: <Email />,
      info: data ? data[0]?.email : "info@support.com",
    },
    {
      label: "location",
      url: <Location />,
      info: data ? data[0]?.address : "123 lorem ipsum, xyz colony, USA 452896",
    },
  ];

  return (
    <>
      <header>
        <div className="sm:w-[80%] w-full mx-auto absolute top-0 z-10 sm:left-[5%] sm:right-[5%] sm:px-0 px-[10px]">
          <div className="flex justify-between items-center z-1  py-4 w-full">
            <div className="cursor-pointer" onClick={() => handleClick()}>
              <Image src="/svg/logo.svg" alt="logo" width={230} height={40} />
            </div>
            <div className="flex gap-x-10 items-center">
              <div className="sm:flex gap-x-3 items-center hidden">
                <Link href="#">
                  <Image
                    src="/svg/icon1.svg"
                    alt="logo"
                    width={20}
                    height={20}
                    className="cursor-pointer icon-hover"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/svg/icon2.svg"
                    alt="logo"
                    width={20}
                    height={20}
                    className="cursor-pointer icon-hover"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/svg/icon3.svg"
                    alt="logo"
                    width={20}
                    height={20}
                    className="cursor-pointer icon-hover"
                  />
                </Link>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setOpenDrawer(true)}
              >
                <Image
                  src="/svg/menu.svg"
                  alt="logo"
                  width={25}
                  height={25}
                  className="icon-hover"
                />
              </div>
            </div>
          </div>

          {openDrawer && (
            <div
              id="drawer-form"
              className="absolute sm:fixed content-center z-[1111] overflow-y-auto transition-opacity duration-150 ease-in-out delay-75 right-0 top-1 bottom-1 rounded  w-full md:max-w-[400px] max-w-[320px] lg:bg-black/90 min-h-screen  bg-black"
              tabIndex={-1}
              aria-labelledby="drawer-form-label"
            >
              <button
                type="button"
                onClick={closeDrawer}
                className=" shadow-2xl text-sm  top-2 mx-4 my-4 inline-flex items-center justify-center text-white"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 23.75L6.25 22L13.25 15L6.25 8L8 6.25L15 13.25L22 6.25L23.75 8L16.75 15L23.75 22L22 23.75L15 16.75L8 23.75Z"
                    fill="white"
                  />
                </svg>

                <span className="sr-only bg-black">Close menu</span>
              </button>
              <div className="contact-details">
                <div className="flex flex-col md:gap-10 gap-8 lg:py-[40px] py-[20px] lg:px-[40px] px-[20px]">
                  {contactData.map((item, inx) => (
                     <Link
                      key={inx}
                     href={
                       item.label === "location"
                         ? googleMapsUrl
                         : item.label === "email"
                         ? `mailto:${item.info}`
                         : `tel:${item.info}`
                     }
                     target="_blank"
                   >
                    <div
                      className="bg-[#F1F1F1] px-[15px] py-[20px] flex gap-3 items-center hover:shadow-xl hover:rounded transition ease-in-out delay-150  duration-300 rounded"
                    >
                      <div className="2xl:w-[48px] 2xl:h-[48px] w-[38px] h-[38px] lg:p-2 p-1 rounded-[50%] flex  justify-center items-center sm:bg-[black]">
                        {item.url}
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <p className="2xl:text-[20px] text-[16px] font-[700] xl:leading-[30px] leading-[27px] uppercase">
                          {item.label}
                        </p>
                       
                          <p className="2xl:text-[16px] text-[14px] font-[500] lg:leading-[23px] leading-normal">
                            {item.info}
                          </p>
                      </div>
                    </div>
                        </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
      </header>
    </>
  );
};

export default Header;
