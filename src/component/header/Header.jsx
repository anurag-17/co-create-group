import Image from "next/image";
import React, { useState } from "react";

const Header = ({handleClick}) => {

  const headings = ["ABOUT US", "SERVICES", "CONTACT US", "HELP AND FAQS"];

const [openDrawer, setOpenDrawer] = useState(false)

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
              <div className="cursor-pointer"> onClick={()=>setOpenDrawer(true)}
                <Image src="/svg/menu.svg" alt="logo" width={25} height={25}/>
              </div>
            </div>
          </div>
        </div>
{/* 
        <div className="absolute z-20 left-0 top-0 h-[100vh] w-[100%] bg-black py-4 px-4">
          <div className="absolute text-right right-5">
            <Image src="/svg/white-cross.svg" alt="close" height={20} width={20} />
          </div>

          <ul className="flex flex-col gap-10 justify-center items-center">
            {headings.map((items,index)=>(
              <li key={index} className="text-white text-16px font-[600]">{items}</li>
            ))}
          </ul>
        </div> */}
      </header>
    </>
  );
};

export default Header;
