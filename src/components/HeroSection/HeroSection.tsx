"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { LuUpload } from "react-icons/lu";
import Button from "../ReusableComponents/Button";

const HeroSection = () => {
  const router = useRouter();
  const handlePush = () => {
    router.push("/upload-pdf");
  };

  return (
    <div className="text-center flex justify-center items-center mt-[15rem] flex-col relative bottom-[9rem] px-4 md:px-0">
      <div className="relative text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12 space-y-2 flex flex-col">
          Interact With PDFs Like <span className="mt-2">Never Before</span>
        </h1>
      </div>
      <div className="mb-8">
        <p className="font-bold mx-auto" style={{ maxWidth: "600px" }}>
          Discover a new way to chat with PDFs, ask questions and summarize
          documents with our AI-powered system.
        </p>
      </div>
      <Button
        btnName="Upload Your Pdf"
        handleClick={handlePush}
        icon={LuUpload}
      />
    </div>
  );
};

export default HeroSection;
