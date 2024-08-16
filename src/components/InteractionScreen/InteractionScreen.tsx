import React from "react";
import { BsUpload } from "react-icons/bs";
import { ImFileEmpty } from "react-icons/im";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";

const InteractionScreen = () => {
  return (
    <div className="max-w-4xl mx-auto py-8" id="feature">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Streamline Your </h1>
        <h1 className="text-4xl font-bold mb-2">PDF Interactions with AI</h1>
        <p className="text-gray-600 mt-7">
          With our AI-powered website, you can easily upload your PDFs and start
          interacting with our intelligent system. Simply ask questions, chat
          with the AI, and get accurate summaries of your documents in no time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg shadow-md text-center">
          <BsUpload size={30} className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Upload Your PDFs</h2>
          <p className="text-white">
            Quickly and securely upload your PDF files.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-md text-center">
          <ImFileEmpty size={30} className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Interact with AI</h2>
          <p className="text-white">
            Ask questions, chat with AI, get accurate summaries.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-md text-center">
          <HiOutlineDocumentDuplicate size={30} className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Explore Summaries</h2>
          <p className="text-white">
            Review accurate summaries of your documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractionScreen;
