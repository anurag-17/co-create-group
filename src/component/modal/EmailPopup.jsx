import React, { useState } from "react";

const EmailPopup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submitEmail = (e) => {
    e.preventDefault()
    console.log(email);
    // setLoading(true)
  };

  return (
    <>
      <div className="md:py-[32px] py-[10px] md:px-[32px] px-[10px]">
        <div className="flex flex-col 2xl:gap-6 gap-4 2xl:max-w-[75%] sm:max-w-[85%] w-full">
          <h6 className="2xl:text-[40px] md:text-[35px] text-[28px] font-[700] xl:leading-[50px] leading-[35px] uppercase">
            email
          </h6>
          <p className="2xl:text-[16px] text-[14px] font-[500] md:leading-[26px] leading-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form onSubmit={submitEmail}>
            <div className="flex flex-col gap-4">
              <div className="">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="bg-[#F2F2F2] placeholder:text-[#A9A9A9] text-[16px] placeholder:text-[14px] font-500 leading-[26px] 2xl:h-[53px] h-[48px] w-full focus-visible:outline-none px-[20px]"
                  onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
              <div className="">
                <button  type="submit" className="bg-black px-3 2xl:text-[18px] text-[15px] font-[700] leading-[28px] uppercase text-white sm:max-w-[160px] w-full 2xl:h-[53px] h-[48px] ">
                   {isLoading ? "Loading.." : "submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailPopup;
