import React from 'react'
import LoaderImage from '@/assets/loader.png'
import Image from 'next/image'
const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen m-auto'>
        <Image alt='loader' src={LoaderImage} width={200 } height={200} className='animate-spin' />
    </div>
  )
}

export default Loader;