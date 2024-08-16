import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import UserAvatar from '@/assets/b84078f59fedb0ab8eee6f0eeb77dcc2.png';
import AiAvatar from '@/assets/logo.png';
import Image from "next/image";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!messages) return null;

  return (
    <div
      ref={messageContainerRef}
      className="flex flex-col gap-2 px-4 relative scroll-mt-[var(--scroll-mt)] overflow-auto mr-10"
      style={{ maxHeight: "calc(100vh - 200px)" }} 
    >
      {messages.map((message) => (
        <div
        key={message.id}
        className={cn("flex items-center p-3 rounded-lg shadow-md mb-4 transition-colors duration-300", {
          "bg-transparent text-white justify-start": message.role === "user", 
          "bg-yellow-300 text-black justify-end": message.role === "assistant",
        })}
      >
          {message.role === "user" && (
            <Image
              src={UserAvatar.src}
              alt="User avatar"
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
          )}

          {/* Message Bubble */}
          <div className="flex flex-col">
            <p className="text-lg">{message.content}</p>
          </div>

          {/* Avatar */}
          {message.role === "assistant" && (
            <Image
              src={AiAvatar.src}
              alt="AI avatar"
              width={64}
              height={64}
              className="rounded-full ml-4"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
