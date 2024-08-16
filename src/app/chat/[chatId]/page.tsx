'use client'
import DocumentList from '@/components/Document'
import UserNav from '@/components/Navbar/UserNav'
import Chatsection from '@/components/chat-section/Chatsection'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
type Props = {
  params: {
    chatId: string;
  };
};
const ChatLayout = ({ params: { chatId } }: Props) => {
  const [showDoc, setShowDoc] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const navigate = useRouter();

  useEffect(() => {
    const fetchUid = () => {
      const token = localStorage.getItem('Uid');
      setUid(token);
    };
    fetchUid();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (uid) {
        try {
          const res = await axios.post("/api/chats", { Uid: uid, ChatId: chatId });
          if (!res.data.chats.length || !res.data.currentChat) {
            navigate.push('/');
          } else {
            setChats(res.data.chats);
          }
        } catch (error) {
          console.error("Error fetching chats", error);
          navigate.push('/');
        }
      }
    };
    fetchChats();
  }, [chatId, uid, navigate]);
  return (
    <div className='flex flex-col'>
      <UserNav showchat = {true} />
      <div className='flex flex-row gap-8 max-h-dvh md:p-12 p-2'>
        <DocumentList showdoc={showDoc}  setshowdoc={setShowDoc} Chats={chats}/>
        <Chatsection chatId={parseInt(chatId)} showdoc = {showDoc} setshowdoc = {setShowDoc}/>
      </div>
    </div>
  )
}
export default ChatLayout;