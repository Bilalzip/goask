'use client'
import React from 'react';
import Image from 'next/image';
import logo from '../../assets/logo.png';
import Link from 'next/link';
import { Cross } from 'lucide-react';
import UserAvatar from '@/assets/b84078f59fedb0ab8eee6f0eeb77dcc2.png';
import { useRouter } from 'next/navigation';

type ShowChatProps = {
  showchat: boolean;
};

const UserNav: React.FC<ShowChatProps> = ({ showchat }) => {

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
            <button onClick={handleNewchat} className="hidden md:flex flex-row gap-2 justify-center items-center px-4 py-2 bg-yellow-400 text-black rounded-md font-bold">
            <Cross size={20} /> Start New Chat
            </button>
        )}
        <div className="bg-green-300 rounded-full flex justify-center items-center w-12 h-12">
          <Image
            src={UserAvatar}
            alt="User logo"
            className="rounded-full object-cover"
            width={48}
            height={48}
          />
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
