import Image from "next/image";
import React from "react";
import Email from "./svg/Email";
import Location from "./svg/Location";
import Phone from "./svg/Phone";

const ContactDetails = () => {
  const contactData = [
    {
      label: "phone",
      url: <Phone/>,
      info: "+89 8974 4895 586",
    },
    {
      label: "email",
      url: <Email/>,
      info: "info@support.com",
    },
    {
      label: "location",
      url: <Location/>,
      info: "123 lorem ipsum, xyz colony, USA 452896",
    },
  ];

  const array2 = ["schedule", "email", "chat"];

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
              <div className="bg-[#F1F1F1] px-[15px] py-[20px] flex gap-3 items-center hover:shadow-xl hover:rounded transition ease-in-out delay-150  duration-300">
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
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
