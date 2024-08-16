"use client";
import React from "react";
import Image from "next/image";
import TryImage from "@/assets/Tryit.png";
import Button from "../ReusableComponents/Button";
import { useRouter } from "next/navigation";

const TryItSection = () => {
  const route = useRouter();
  const handleClick = () => {
    route.push("/sign-up");
  };

  return (
    <div className="relative w-full h-80 md:h-[500px]">
      <div
        className="absolute inset-0 bg-black opacity-65 z-10"
        style={{ backdropFilter: "blur(8px)" }}
      ></div>
      {/* Background image */}
      <Image
        src={TryImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white p-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Unlock the Power of AI
        </h1>
        <div>
          <p className="mt-3 md:mt-5 text-center">
            Chat with PDFs, ask questions, and get instant document summaries.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <Button btnName="Sign Up" handleClick={handleClick} />
          <div
            className="bg-white text-black px-4 py-2 rounded-md text-center cursor-pointer"
            onClick={() => route.push("/upload-pdf")}
          >
            Try It
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryItSection;
