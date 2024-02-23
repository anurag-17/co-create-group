"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "@/component/config";

function FaqChatAssistant({ setIsFaqbot }) {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thread, setThread] = useState(null);

  // console.log("chat",chat);
  const chatRef = useRef(null);
  chatRef.current = chat;
  const askAssistant = async (e) => {
    e.preventDefault()
    if (thread === null) {
      const options = {
        method: "POST",
        url: `${BASE_URL}/api/auth/create-thread`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.request(options);
      setThread(res?.data);
      sendMessage(res?.data?.id);
    } else {
      sendMessage(thread?.id);
    }
  };

  const sendMessage = async (threadId) => {
    let getQuestion = question;
    let chatList = [...chatRef.current, { role: "user", message: getQuestion }];
    setChat(chatList);
    setQuestion("");

    setLoading(true);

    const options = {
      method: "POST",
      url: `${BASE_URL}/api/auth/send-message`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        threadId: threadId,
        message: getQuestion,
      },
    };
    const res = await axios.request(options);
    // console.log("res===", res);
    if (res.statusText === "OK") {

      setChat(res?.data?.messages);
      setQuestion("");
    }
    setLoading(false);
  };

  return (
    <div className=" h-[500px] flex flex-col bg-myBg gap-4 max-w-[500px] rounded-[30px] shadow-2xl m-[20px] bg-white z-[111] pb-[30px]">
      <div className="bg-black py-[15px] flex rounded-t-[30px] gap-2 justify-between px-[20px] items-center">
        <div className="flex  gap-3  items-center">
          <div className="h-[40px] w-[40px] bg-white rounded-[50%] font-bold text-[18px] flex justify-center items-center">
            B
          </div>
          <div className="flex flex-col text-white text-left">
            <p className="font-semibold text-[13px]">
            The Co-create Group
            </p>
            <p className="font-medium text-[13px] ">FAQ based bot</p>
          </div>
        </div>
        <div
          className=" cursor-pointer right-3"
          onClick={() => setIsFaqbot(false)}
        >
          <Image src="/svg/closeWhite.svg" alt="close" height={20} width={20} />
        </div>
      </div>
      <div className="chatgpt flex flex-col gap-2 w-full h-full overflow-y-auto scroll py-[30px] px-[20px]">
        <div className="text-black bg-gray-100 self-start border-2 rounded-[10px] px-3 py-3 max-w-md flex text-[14px]">
          Hello, How can I help you?
        </div>
        {chat?.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg?.role === "assistant"
                ? "text-black bg-gray-100 self-start flex  "
                : "bg-black text-gray-100 self-end border-2 "
            } rounded-[10px]  px-3 py-3 max-w-sm min-w-[100px] flex text-[14px] text-left `}
          >
            <span className="">{msg?.message}</span>
          </div>
        ))}
        {loading && (
          <div
            className={` text-gray-100 self-start rounded-lg px-3 py-2 w-[100px] flex justify-center items-center`}
          >
            <span className="chat_loader"></span>
          </div>
        )}
      </div>
      <div className="bg-[#E0E0E0] h-[1px] w-[90%] px-[20px] mx-auto"></div>
         
      <form  onSubmit={askAssistant} >
      <div className="flex gap-2 mt-auto px-[20px] ">
        <input
          id="question"
          className="border text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none placeholder:text-[15px] text-[16px] border-none"
          placeholder="Enter you message..."
          required
          value={question}
          // onKeyDown={(e) => {
          //   e.code == "Enter" && !e.shiftKey && askAssistant(e);
          // }}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
        type="submit"
        disabled={loading }
          className=" flex items-center justify-center text-white bg-black focus-visible:outline-none font-semibold rounded-[50%] text-sm w-[50px] h-[50px] sm:w-auto px-4 py-2.5 text-center "
        >
          {/* Send */}
          <Image height={25} width={25} src="/svg/send.svg" alt="send" />
        </button>
      </div>
      </form>
    </div>
  );
}

export default FaqChatAssistant;
