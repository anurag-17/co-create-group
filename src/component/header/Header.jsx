import Image from "next/image";
import React from "react";

const Header = ({handleClick}) => {


  return (
    <>
      <header>
        <div className="w-[80%] mx-auto absolute top-0 z-10 sm:left-[5%] sm:right-[5%] left-1 right-1" >
          <div className="flex justify-between items-center z-1  py-4 w-full">
            <div className="cursor-pointer"  onClick={()=>handleClick()}>
              <Image src="/svg/logo.svg" alt="logo" width={230} height={40} />
            </div>
            <div className="flex gap-x-10 items-center">
              <div className="sm:flex gap-x-3 items-center hidden">
                <Image src="/svg/icon1.svg" alt="logo" width={20} height={20} className="cursor-pointer" />
                <Image src="/svg/icon2.svg" alt="logo" width={20} height={20} className="cursor-pointer" />
                <Image src="/svg/icon3.svg" alt="logo" width={20} height={20} className="cursor-pointer" />
              </div>
              <div className="cursor-pointer">
                <Image src="/svg/menu.svg" alt="logo" width={25} height={25}/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
