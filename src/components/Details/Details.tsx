import React from "react";
import InformationImage from "@/assets/Details.png";
import Image from "next/image";

const Details = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse justify-between items-center h-screen lg:gap-52">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-[11rem]">
        <div className="lg:w-1/2 lg:order-2 mb-4 lg:mb-0 lg:ml-16">
          <Image
            src={InformationImage}
            alt="Information Screen Image"
            width={500}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:order-1 lg:ml-[6.5rem] text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight lg:leading-[4.75rem] lg:mr-10">
            Chat with PDF documents using
            <br />
            AI technology for seamless
            <br />
            interaction.
          </h1>
          <p className="text-base md:text-lg text-gray-700 lg:mr-10">
            Our AI-powered website allows you to have conversations with PDFs,
            making it easier to ask questions and get document summaries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
