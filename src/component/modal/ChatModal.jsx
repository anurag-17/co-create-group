import Image from "next/image";
import React from "react";

const ChatModal = ({ setOpenChat }) => {
  return (
    <>
      <div className="bg-black h-[130px] text-white flex py-2 items-center px-10 justify-between">
        <div className="flex">
          <div className="">
            <Image
              src="/svg/profile.svg"
              alt="profile"
              height={50}
              width={50}
            />
          </div>
          <div className="">
            <p className="2xl:text-[16px] text-[14px] font-[500] lg:leading-[26px] leading-normal">
              chat with
            </p>
            <p className="2xl:text-[20px] lg:text-[16px] text-[15px] font-[500] lg:leading-[23px] leading-normal">
              Jessica Smith
            </p>
          </div>
        </div>
        <div className="">
          <div className="cursor-pointer " onClick={() => setOpenChat(false)}>
            <Image
              src="/svg/white-cross.svg"
              alt="close"
              height={20}
              width={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
