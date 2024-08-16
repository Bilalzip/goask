'use client';
import ProfileDash from '@/components/profile/ProfileDash';
import ProfileNav from '@/components/profile/ProfileNav';
import { Menu, X } from 'lucide-react'; // Add 'X' icon
import React, { useState } from 'react';
import clsx from 'clsx'; // for conditional class names

const Page = () => {
  const [slideNav, setSlideNav] = useState(false);

  return (
    <div  className='flex flex-col md:flex-row justify-center mx-auto h-fit md:m-20 m-1'>
      {/* Mobile Navigation */}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full transition-transform',
          slideNav ? 'translate-x-0' : '-translate-x-full'
        )}

        style={{
          background: "black" , zIndex:'100'
        }}
      >
        <ProfileNav />
      </div>

      {/* Desktop Navigation */}
      <div    style={{
        background: "#8D929A",
      }} className=' p-4 rounded-l-lg md:block hidden'>
        <ProfileNav />
      </div>

      {/* Mobile Menu Button */}
      <div className='flex md:hidden justify-between p-4'>
        <h1 className='text-2xl text-white'>Edit Profile</h1>
        <button onClick={() => setSlideNav(!slideNav)}>
          {slideNav ? (
            <X color='green' width={36} height={36} />
          ) : (
            <Menu color='green' width={36} height={36} />
          )}
        </button>
      </div>

      <div
        className={clsx(
          'bg-slate-600 rounded-r-lg w-fit md:w-1/2 h-full md:m-0 m-1',
          slideNav && 'backdrop-blur-lg'
        )}
      >
        <ProfileDash />
      </div>
    </div>
  );
};

export default Page;
