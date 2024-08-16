"use client";
import React from "react";
import { MdManageSearch } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GiSentryGun } from "react-icons/gi";
import { GoUnlock } from "react-icons/go";
import Image from "next/image";
import OverviewImage from "@/assets/Overview.png";
import Button from "../ReusableComponents/Button";

const Overview = () => {
  const handleClick = () => {};
  return (
    <div
      className=" py-10 mt-[50px] px-5 md:px-20 lg:px-40 flex flex-col md:flex-row items-center"
      id="how-it-works"
    >
      <div className="md:w-1/2 md:pr-10 text-center md:text-left">
        <h1 className="text-3xl font-bold mb-4">
          Ask Questions, Get Accurate Answers from PDFs
        </h1>
        <p className="text-lg text-gray-600">
          Our innovative feature allows you to ask relevant questions and
          receive accurate answers directly from your PDF documents. Say goodbye
          to manual searching and let our AI-powered system do the work for you.
        </p>
        <div className="flex items-center mt-6">
          <MdManageSearch size={19} className="mr-3" />
          <span className="text-lg">
            Effortlessly find answers to your PDF questions
          </span>
        </div>
        <div className="flex items-center mt-3">
          <IoMdTime className="mr-3" />
          <span className="text-lg">
            Save time with our intelligent PDF question-answering feature
          </span>
        </div>
        <div className="flex items-center mt-3">
          <GoUnlock className="mr-3" />
          <span className="text-lg">
            Unlock the power of AI for PDF question answering
          </span>
        </div>
        <div className="mt-4 flex justify-start text-center ">
          <Button
            btnName="Try it"
            handleClick={handleClick}
            classStyle="text-center"
          />
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <Image
          src={OverviewImage}
          alt="Overview image"
          width={800}
          height={600}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Overview;
