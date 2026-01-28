'use client'
import DocumentList from '@/components/Document'
import UserNav from '@/components/Navbar/UserNav'
import Chatsection from '@/components/chat-section/Chatsection'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
  params: {
    chatId: string;
  };
};

type ChatItem = { id: number; pdfName: string };

const ChatLayout = ({ params: { chatId } }: Props) => {
  const [showDoc, setShowDoc] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('Uid');
    setUid(token);
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!uid) return;
      try {
        const res = await axios.post("/api/chats", { Uid: uid, ChatId: chatId });
        const list: ChatItem[] = (res.data.chats || []).map((c: any) => ({ id: c.id, pdfName: c.pdfName }));
        if (!list.length || !res.data.currentChat) {
          router.push('/');
          return;
        }
        // Deduplicate by id to avoid repeated sessions
        const unique = Array.from(new Map(list.map(c => [c.id, c])).values());
        setChats(unique);
      } catch (error) {
        console.error("Error fetching chats", error);
        router.push('/');
      }
    };
    fetchChats();
  }, [chatId, uid, router]);

  const activeId = useMemo(() => parseInt(chatId), [chatId]);

  return (
    <div className='flex flex-col'>
      <UserNav showchat={true} />
      <div className='flex flex-row gap-8 max-h-dvh md:p-12 p-2'>
        <DocumentList
          showdoc={showDoc}
          setshowdoc={setShowDoc}
          Chats={chats}
          activeChatId={activeId}
          onChatsChange={(next: ChatItem[]) => setChats(next)}
        />
        <Chatsection chatId={activeId} showdoc={showDoc} setshowdoc={setShowDoc} />
      </div>
    </div>
  )
}
export default ChatLayout;
