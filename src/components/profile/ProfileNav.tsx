import { BellDotIcon, DeleteIcon, LockIcon, Menu, RecycleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { GiDustCloud } from 'react-icons/gi'

const ProfileNav = ({setNavbar , Navbar}:any) => {
  
  return (
    <div >
         <div>
         <div className='flex flex-col gap-4 w-full md:p-0 p-8'>
        <div className='flex flex-row gap-3 items-center 
        '>
        <CgProfile className='text-2xl '/> <h1>Profile</h1>
        </div>
        <div className='flex flex-row gap-3'>
        <LockIcon/> <h1>Password</h1>
        </div> 
        <div className='flex flex-row gap-3'>
        <BellDotIcon/> <h1>Notifications</h1>
        </div>

        <div className='text-[#DE3B40] flex flex-row gap-3 pt-4
         border-t-white border-t-2
        '>
            <RecycleIcon className='text-2xl'/> <h1>Delete your account</h1>
        </div>
         </div>
   
    </div>
    </div>
    
  )
}

export default ProfileNav