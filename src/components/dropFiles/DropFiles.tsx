"use client";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { LuUpload } from 'react-icons/lu';
import Image from 'next/image';
import CloudImage from '@/assets/Cloud upload 1.png';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { uploadToS3 } from '@/lib/UploadFile';
import { Loader2 } from 'lucide-react';


const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  height: 20rem;
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #f0f4ff80;
  text-align: center;

  /* Responsive design for smaller screens */
  @media (max-width: 600px) {
    width: 20rem;
    height: 20rem;
  }
`;

const DropFiles = (props:any) => {
    const [Uid , setUid] =  useState<any>();

  useEffect(()=>{
    const data = ()=>{
      const token = localStorage.getItem('Uid');
      setUid(token);
    }
    data();
  })
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(Uid)
  const { mutate } = useMutation({
    mutationFn: async ({ file_key, file_name }:any) => {
      try {
        console.log( { file_key, file_name , Uid });
        const response = await axios.post('/api/create-chat', { file_key, file_name , Uid });
        router.push(`/chat/${response.data.chat_id}`);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'], 'text/plain': ['.txt'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        console.error("File too large");
        return;
      }

      setLoading(true);

      try {
        const data = await uploadToS3(file);


        if (data?.file_key && data.file_name) {
          mutate(data);
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error during upload:", error);
      }
    },
  });

  return (
    <div className='mt-12'>
      {!loading ? (
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <div>
            <Image alt='CloudImage' src={CloudImage} style={{ width: '80px', height: '80px' }} />
          </div>
          <div>
            {isDragActive ? 'Drop your files here...' : 'Drag & drop your files here'}
          </div>
          <div>
            <span>Or</span>
            <button className="relative overflow-hidden focus:outline-none bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md flex mx-auto gap-2 mt-2">
              <LuUpload className="mt-1" size={17} />
              Browse Files
            </button>
          </div>
        </DropzoneContainer>
      ) : (
        <div className="flex flex-col justify-center items-center p-8">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="text-xl text-black font-mono mt-2">Uploading... Please wait!</p>
        </div>
      )}
    </div>
  );
};

export default DropFiles;
