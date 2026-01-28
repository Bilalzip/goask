'use client'

import Image from 'next/image';
import logo from '../../assets/logo.png';
import Link from 'next/link';
import { Cross, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ShowChatProps = {
  showchat: boolean;
};

const UserNav: React.FC<ShowChatProps> = ({ showchat }) => {
    const [initial, setInitial] = useState<string>('U');
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const email = (localStorage.getItem('email') || 'U').trim();
        setInitial(email.charAt(0).toUpperCase());
      }
    }, []);
    const router = useRouter();
    const handleNewchat = ()=>{
         router.push('/upload-pdf');
    }
  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <a href={'/'} className="flex flex-row items-center justify-center gap-2">
        <Image src={logo} alt="Logo PNG" height={49} width={50} />
        <span className="text-yellow-300 font-bold mt-3 text-xl">GoAskPDF</span>
      </a>
      <div className="flex flex-row justify-center items-center gap-6">
        {showchat && (
          <>
            <button
              onClick={handleNewchat}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow hover:shadow-md ring-1 ring-black/10 transition"
            >
              <Plus size={18} /> Start New Chat
            </button>
            <button
              onClick={handleNewchat}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-black shadow hover:bg-yellow-300 transition"
              aria-label="Start new chat"
              title="Start new chat"
            >
              <Plus size={18} />
            </button>
          </>
        )}
        <a href={'/profile'} className="rounded-full flex justify-center items-center w-12 h-12 overflow-hidden bg-white/10 border border-white/10">
          <span className="text-white/80 font-semibold">{initial}</span>
        </a>
      </div>
    </nav>
  );
};

export default UserNav;
