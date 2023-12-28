import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const EmailPopup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isMessage, setMessage] = useState("");

  const submitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/enquiry/createEnquiry`,
        { email }
      );
      if (response.status === 201) {
        setLoading(false);
        setEmail("");
        setMessage("");
        toast.success("Mail sent successfully ! Please check your mail", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        setLoading(false);
        setMessage("");
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 403) {
        setMessage(error?.response?.data?.message);
      } else {
        toast.error("Failed! Please try again");
        setMessage("");
        return;
      }
    }
  };

  return (
    <>
      <div className="2xl:py-[32px] py-[10px] 2xl:px-[32px] px-[10px]">
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
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#F2F2F2] placeholder:text-[#A9A9A9] text-[16px] placeholder:text-[14px] font-500 leading-[26px] 2xl:h-[53px] h-[48px] w-full focus-visible:outline-none px-[20px]"
                  onChange={(e) => {
                    setEmail(e.target.value), setMessage("");
                  }}
                  required
                />
              </div>
              {isMessage && (
                <div className="text-[13px] font-normal text-[red] px-4 py-2 rounded bg-red-100">
                  {isMessage}{" "}
                </div>
              )}
              <div className="">
                <button
                  type="submit"
                  className="bg-black px-3 2xl:text-[18px] text-[15px] font-[700] leading-[28px] uppercase text-white sm:max-w-[160px] w-full 2xl:h-[53px] h-[42px] "
                >
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
