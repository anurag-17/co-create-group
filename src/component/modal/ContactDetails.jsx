import Image from "next/image";
import React, { Fragment, useState } from "react";
import Email from "./svg/Email";
import Location from "./svg/Location";
import Phone from "./svg/Phone";
import { Dialog, Transition } from "@headlessui/react";
import EmailPopup from "./EmailPopup";

const ContactDetails = () => {
  const [openEmail, setOpenEmail] = useState(false);

  const contactData = [
    {
      label: "phone",
      url: <Phone />,
      info: "+89 8974 4895 586",
    },
    {
      label: "email",
      url: <Email />,
      info: "info@support.com",
    },
    {
      label: "location",
      url: <Location />,
      info: "123 lorem ipsum, xyz colony, USA 452896",
    },
  ];

  const array2 = ["schedule", "email", "chat"];

  const handleClose = () => {
    setOpenEmail(false)
  }
  return (
    <>
      <div className=" 2xl:px-[30px] 2xl:py-[40px] py-[30px] contact-details">
        <div className="">
          <h6 className="2xl:text-[40px] md:text-[35px] text-[24px] font-[700] xl:leading-[50px] leading-[35px] uppercase text-center">
            contact details
          </h6>
        </div>

        <div className="grid grid-cols-3 gap-5 lg:py-[40px] py-[20px]">
          {contactData.map((item, inx) => (
            // <div className="bg-[#F1F1F1] max-w-[330px] w-full sm:w-auto" key={inx}>
            <div
              className="bg-[#F1F1F1] px-[15px] py-[20px] flex gap-3 items-center hover:shadow-xl hover:rounded transition ease-in-out delay-150  duration-300"
              key={inx}
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
              {/* </div> */}
            </div>
          ))}
        </div>

        <div className="md:grid grid-cols-3 flex lg:gap-5 gap-3 flex-wrap md:flex-nowrap justify-center w-full xl:w-[70%] md:w-[90%] mx-auto">
          {array2.map((item, inx) => (
            <div
              className="2xl:text-[18px] md:text-[15px] text-[13px] font-[700] xl:leading-[30px] leading-[26px] uppercase bg-black text-white flex justify-center items-center py-2 px-4 w-auto sm:max-w-[180px] hover:bg-[#000000d1] cursor-pointer transition ease-in-out delay-150 duration-300"
              key={inx}
              onClick={() => {
                item === "email" && setOpenEmail(true);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <Transition appear show={openEmail} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[111]"
          onClose={() => setOpenEmail(false)}
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
                <Dialog.Panel className="w-full 2xl:max-w-[800px] sm:max-w-[600px] transform overflow-hidden rounded-[30px] bg-white py-10 md:px-12 px-4 text-left align-middle shadow-xl transition-all relative">
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
                  <EmailPopup handleClose={handleClose}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ContactDetails;
