"use client";
import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { BASE_URL } from "./config";
import Image from "next/image";
export const ChatBot = ({ setIsChatbot }) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, How can I help you today?",
      sender: "Bot",
    },
  ]);

  const [typing, setTyping] = useState(false);
  //   const [limit, setLimit] = useState(10)
  const [chatLike, setChatLike] = useState(
    "Explain like a professional business person"
  );

  const handleSend = async (message, file) => {
    ////////////////
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTyping(true);

    await processMessageToGPT(newMessages);
  };
  //////////////////chatgpt//////////////////////
  const processMessageToGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((items, index) => {
      let role = "";
      if (items.sender === "Bot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: items.message };
    });
    ////system message should be industry or chatbot usage specific

    const systemMessage = {
      role: "system",
      content: chatLike,
    };
    //  console.log(systemMessage);
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    // const chatCompletion = await openai.chat.completions.create(apiRequestBody);
    // console.log(chatCompletion);
    await axios
      .post(`${BASE_URL}/api/auth/chatApi`, apiRequestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data.message);
        setMessages([
          ...chatMessages,
          {
            message: data.data.message,
            sender: "Bot",
          },
        ]);
        setTyping(false);
      })
      .catch((error) => {
        console.error(error);
        setTyping(false);
      });
  };

  return (
    <>
      <div className="px-[40px] text-[12px]">
        <div
          className="h-[80vh] max-w-[350px] w-[350px] z-[999] relative"
          //  style={{ position: "relative", height: "50vh" , top:"10px", maxWidth:"350px",width:"350px", borderRadius:"10px" , zIndex:"111"}
        >
          <div
            className="absolute  my-2 right-3 cursor-pointer font-bold text-[15px] text-black z-[11]"
            onClick={() => setIsChatbot(false)}
          >
            <Image src="/svg/close.svg" alt="close" height={20} width={20} />
          </div>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? <TypingIndicator content="Bot is typing" /> : null
                }
              >
                {messages.map((message, i) => {
                  return (
                    <Message
                      key={i}
                      model={message}
                      className={
                        message.sender === "Bot" ? "sent " : "received"
                      }
                    >
                      {message.sender === "Bot" ? (
                        <Avatar
                          src="/chat.png"
                          name="bot"
                          size="sm"
                          status="available"
                        />
                      ) : (
                        ""
                      )}
                      <Message.Header
                        style={{ fontSize: "13px" }}
                        sender={message.sender}
                      />
                      <Message.Content style={{ fontSize: "13px" }}>
                        {message.message}
                      </Message.Content>
                    </Message>
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                attachButton={false}
                style={{ background: "white", fontSize: "13px" }}
              />
            </ChatContainer>
          </MainContainer>
        </div>
        ;
      </div>
    </>
  );
};
