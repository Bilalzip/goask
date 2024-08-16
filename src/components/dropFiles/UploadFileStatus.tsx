import Image from 'next/image'
import React from 'react'
import FileImage from '@/assets/file.png'
import Remove from '@/assets/E remove 2.png'
import { Cross } from 'lucide-react'
const UploadFileStatus = () => {
    const handleOnClick = ()=>{};
  return (
   <div className='flex flex-col gap-3 p-8'>
    <h1 className='text-2xl font-bold'>Uploading Files</h1>
     <div className="content flex flex-row gap-3 ">
        <Image className='h-12 ' alt='File Logo' src={FileImage}/>  
        <div className='flex flex-col gap-2'>
                <p>Your file name</p> 
               <div className='flex flex-row items-center justify-center'>
               <div className='loadingLine h-2 md:w-[45rem] w-[15rem] rounded-lg bg-[#00C308]'/>
               <button onClick={handleOnClick}>
                <Image src={Remove}  alt='Remove' />
               </button>
                </div>
        </div>
     </div>
   </div>
  )
}

export default UploadFileStatus