'use client';
import ProfileDash from '@/components/profile/ProfileDash';
import ProfileNav from '@/components/profile/ProfileNav';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import clsx from 'clsx';

const Page = () => {
  const [slideNav, setSlideNav] = useState(false);

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {/* Mobile Top Bar */}
      <div className='md:hidden flex items-center justify-between mb-4'>
        <h1 className='text-xl font-semibold text-white'>Profile</h1>
        <button onClick={() => setSlideNav(!slideNav)} className='p-2 rounded-lg bg-white/10 border border-white/10'>
          {slideNav ? <X className='text-yellow-400' width={20} height={20} /> : <Menu className='text-yellow-400' width={20} height={20} />}
        </button>
      </div>

      <div className='grid grid-cols-12 gap-6'>
        {/* Sidebar */}
        <div className='hidden md:block md:col-span-4 lg:col-span-3 sticky top-6 h-fit'>
          <ProfileNav />
        </div>

        {/* Mobile slide-in */}
        <div className={clsx('md:hidden fixed inset-y-0 left-0 w-72 p-4 bg-[#0b1020] border-r border-white/10 transform transition-transform z-50', slideNav ? 'translate-x-0' : '-translate-x-full')}>
          <ProfileNav />
        </div>

        {/* Main content */}
        <div className='col-span-12 md:col-span-8 lg:col-span-9'>
          <ProfileDash />
        </div>
      </div>
    </div>
  );
};

export default Page;
