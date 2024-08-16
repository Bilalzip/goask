import Image from 'next/image';
import React from 'react';
import ProfilePhoto from '@/assets/b84078f59fedb0ab8eee6f0eeb77dcc2.png';
import { Menu } from 'lucide-react';

const ProfileDash = () => {
  return (
    <div   style={{
      background: "linear-gradient(127.35deg, rgba(255, 255, 255, 0.4) 0%, rgba(153, 153, 153, 0.8) 100%)",
    }} className='flex flex-col gap-6 p-6'>
      <div className='md:block hidden'>
      <h1 className='text-2xl text-white'>Edit Profile</h1>
      </div>
     
      <div className="info flex flex-row gap-6">
        <div className='flex flex-col items-center gap-4 w-fit'>
          <div className='bg-green-300 flex justify-center items-center rounded-lg'>
            <Image src={ProfilePhoto} alt='Profile Photo' style={{
              width:'96px', height:"96px"
            }} />
          </div>
          <h2>Profile Photo</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-xl text-white'>Upload your photo</h1>
          <p className='text-white'>Your photo should be in PNG or JPG format.</p>
          <div className='flex flex-row gap-3'>
            <button className='font-bold bg-[#E7C200] p-2 rounded-md text-black'>
              Change Photo
            </button>
            <button className='font-bold text-white'>
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className='form flex flex-col gap-6'>
        <div className="flex flex-col">
          <label className='text-white' htmlFor='full-name'>
            Full Name
          </label>
          <input
            id='full-name'
            type='text'
            className='border p-2 rounded-md w-full mt-1'
            placeholder='Enter your full name'
          />
        </div>

        <div className="flex flex-col">
          <label className='text-white' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='border p-2 rounded-md w-full mt-1'
            placeholder='Enter your email address'
          />
        </div>

        <div className="flex flex-col">
          <label className='text-white ' htmlFor='location'>
            Location
          </label>
          <input
            id='location'
            type='text'
            className='border p-2 rounded-md w-full mt-1'
            placeholder='Where are you located?'
          />
        </div>

        <div className="flex flex-col">
          <label className='text-white' htmlFor='about-you'>
            Tell us about yourself
          </label>
          <textarea
            id='about-you'
            className='border p-2 rounded-md w-full h-28 mt-1'
            placeholder='Tell us about yourself'
          />
        </div>

        <div className='flex flex-row gap-3'>
          <button className='font-bold text-black bg-white p-2 rounded-md'>
            Cancel
          </button>
          <button className='font-bold bg-[#E7C200] p-2 rounded-md text-black'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDash;
