import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const ScheduleModal = ({ handleClose }) => {

  const [formData, setFormData] = useState({
    date:"",
    number:""
  });
  const [isLoading, setLoading] = useState(false);
  const [isMessage, setMessage] = useState("");

  const formattedToday =  new Date().toISOString().slice(0, 16);
// console.log(formattedToday)
  const InputHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/schedule/createSchedule`,
         formData 
      );
      if (res.status === 201) {
        setLoading(false);
        setMessage("");
        toast.success("Your call scheduled successfully!", {
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
          <h6 className="2xl:text-[40px] md:text-[35px] text-[28px] font-[700] xl:leading-[50px] leading-[35px] ">
            Schedule a call
          </h6>
          <p className="2xl:text-[16px] text-[14px] font-[500] md:leading-[26px] leading-normal">
          Please choose a date and enter your phone number to schedule a call.
          </p>

          <form onSubmit={submitForm}>
              <div className="">
                <input
                  type="datetime-local"
                  name="date"
                  placeholder="Enter ate"
                  className="custom_input"
                  onChange={InputHandler}
                  min={formattedToday}
                  required
                />
              </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="">
                <input
                  type="text"
                  name="number"
                  placeholder="Enter your number"
                  className="custom_input"
                  onChange={InputHandler}
                  pattern="[0-9]*"
                  title="Enter only numbers"
                  required
                />
              </div>
              {isMessage && (
                <div className="text-[13px] font-normal text-[red] px-4 py-2 rounded bg-red-100">
                  {isMessage}
                </div>
              )}
              <div className="">
                <button
                  type="submit"
                  className="custom_button"
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

export default ScheduleModal;
