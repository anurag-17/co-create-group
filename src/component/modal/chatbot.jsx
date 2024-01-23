"use client"
import React, { useEffect } from "react";
import axios from 'axios';


const Chatbot = () => {
    console.log(process.env.NEXT_PUBLIC_chat_id)
    useEffect(() => {
        window.embeddedChatbotConfig = {
          chatbotId: process.env.NEXT_PUBLIC_chat_id,
          domain: 'www.chatbase.co'
        };
    
        let script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.chatbotId = process.env.NEXT_PUBLIC_chat_id;
        script.domain = 'www.chatbase.co';
        script.defer = true;
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);

  return (
    <>
    </>
  );
};

export default Chatbot;
