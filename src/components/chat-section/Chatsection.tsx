'use client';
import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Message } from 'ai';
import { useChat } from "ai/react";
import MessageList from './MessageList';
interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const ChatSection = ({showdoc , setshowdoc , chatId}:any) => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });
  const [streamError, setStreamError] = useState<string | null>(null);
  const { input, handleInputChange, handleSubmit, messages, isLoading: isStreaming } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
    onError: (e) => setStreamError(e?.message || 'Failed to send message'),
  });
 

  const handleSection =()=>{
    setshowdoc(!showdoc)
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
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
        <MessageList
          messages={messages}
          isLoading={isLoading && messages.length === 0}
          isError={!!streamError || isError}
          errorMessage={streamError || (isError ? (error as any)?.message : undefined)}
          isThinking={isStreaming}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 sticky bottom-0 bg-transparent">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask about this document..."
          className="flex-grow resize-none p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button type="submit" className="px-4 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
