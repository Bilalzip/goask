import React from "react";
import InformationImage from "@/assets/Information.png";
import Image from "next/image";

const InformationScreen = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center h-screen lg:gap-52">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-[11rem]md:mt-[57px]">
        <div className="lg:w-1/2 lg:order-2 mb-4 lg:mb-0">
          <Image
            src={InformationImage}
            alt="Information Screen Image"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:order-1 lg:ml-[6.5rem] text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Distill Lengthy Documents into Concise Takeaways with Our
            Summarization Capability
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            Our AI-powered website allows you to chat with PDFs, ask relevant
            questions, and summarize documents effortlessly. Say goodbye to
            information overload and hello to quick and concise insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationScreen;
