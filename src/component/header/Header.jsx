import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="flex justify-between items-center z-1 absolute py-4">
            <div className="">
              <Image src="/svg/logo.svg" alt="logo" width={100} height={100} />
            </div>
            <div className="flex gap-x-10 items-center">
              <div className="">
                <Image src="/svg/icon1.svg" alt="logo" width={25} height={25}/>
                <Image src="/svg/icon2.svg" alt="logo" width={25} height={25}/>
                <Image src="/svg/icon3.svg" alt="logo" width={25} height={25}/>
              </div>
              <div className="">
                <Image src="/svg/menu.svg" alt="logo" width={35} height={35}/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
