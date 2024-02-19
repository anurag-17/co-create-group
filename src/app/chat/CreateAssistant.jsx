"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "@/component/config";

function CreateAssistant({ setIsChatbot }) {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([ { role: "assistant", message: "Hello! how can I help you?" },]);
  const [loading, setLoading] = useState(false);
  const [thread, setThread] = useState(null);

  // console.log("chat",chat);
  const chatRef = useRef(null);
  chatRef.current = chat;
  const askAssistant = async () => {
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
    setQuestion("");
    let chatList = [...chatRef.current, { role: "user", message: getQuestion }];
    setLoading(true);
    setChat(chatList);

    const options = {
      method: "POST",
      url: `${BASE_URL}/api/auth/send-message`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        threadId: threadId,
        message: question,
      },
    };
    const res = await axios.request(options);
    console.log("res===", res);
    if (res.statusText === "OK") {
      setChat(res?.data?.messages);
      setQuestion("");
    }
    setLoading(false);
  };

  // const getAllmessage = async (threadId) => {
  //   const options = {
  //     method: "GET",
  //     url: `api/auth/get-messages/${threadId} `,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const res = await axios.request(options);
  //   console.log("chat==>>>" , res);
  // };

  // useEffect(() => {
  //   if(thread?.id){
  //     getAllmessage(thread?.id);
  //   }
  // }, []);

  return (
    <div className=" h-[600px] w-screen md:p-4 flex flex-col bg-myBg gap-4 max-w-[500px] rounded-md shadow-2xl m-[20px] bg-white z-[111] relative">
      <div className="absolute cursor-pointer right-3" onClick={()=>setIsChatbot(false)}> 
        <Image src="/svg/close.svg" alt="close" height={20} width={20} />
      </div>
      <div className="chatgpt flex flex-col gap-2 w-full h-full overflow-y-auto scroll py-[30px] px-[20px]">
        {chat?.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg?.role === "assistant"
                ? "bg-black text-gray-100 self-start flex "
                : "text-black bg-gray-100 self-end border-2 "
            } rounded-lg  px-3 py-2 max-w-sm flex text-[14px]`}
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
      <div className="flex gap-2 mt-auto">
        <input
          id="question"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus-visible:outline-none placeholder:text-[14px]"
          placeholder="Ask a question"
          required
          value={question}
          onKeyDown={(e) => {
            e.code == "Enter" && !e.shiftKey && askAssistant();
          }}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askAssistant}
          className=" flex items-center justify-center text-white bg-black focus-visible:outline-none font-semibold rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center "
        >
          {/* Send */}
          <Image height={20} width={20} src="/svg/send.svg" alt="send" />
        </button>
      </div>
    </div>
  );
}

export default CreateAssistant;
