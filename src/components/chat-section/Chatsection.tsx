'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send } from 'lucide-react';
import Image from 'next/image';
import UserAvatar from '@/assets/b84078f59fedb0ab8eee6f0eeb77dcc2.png';
import AiAvatar from '@/assets/logo.png';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Message } from 'ai';
import { useChat } from "ai/react";
import MessageList from '../MessageList';
interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const ChatSection = ({showdoc , setshowdoc , chatId}:any) => {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });
 

  const handleSection =()=>{
    setshowdoc(!showdoc)
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  return (
    <div className={`bg-gradient-to-r from-[#F3F4F660] via-[#F3F4F660] to-[#8E8F9080] bg-black rounded-md w-full flex flex-col min-h-screen md:block
    ${
      !showdoc ? 'md:block hidden ' : ''
    }
    `}>
      <div className="flex flex-row justify-between items-center p-4 md:hidden">
        <button onClick={handleSection}>
          <ChevronLeft size={26} color="#00C308" />
        </button>
      </div>

      <div
        className="flex flex-col p-4 overflow-y-auto h-full rounded-md scrollbar-thin scrollbar-thumb-[#101010] scrollbar-track-gray-200 flex-grow"
        style={{
          scrollbarColor: '#101010 #E7C200C7',
          scrollbarWidth: 'thin',
        }}
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <div className="flex flex-row p-4 sticky bottom-0">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow p-2 border  rounded-l-full text-black h-12 focus:border-white"
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="text-white bg-white rounded-r-full p-3"
        >
          <Send color='#00C308'/>
        </button>
      </div>
    </div>
  );
};

export default ChatSection;