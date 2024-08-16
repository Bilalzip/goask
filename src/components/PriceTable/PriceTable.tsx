import React from "react";
import { FaCheck } from "react-icons/fa";

const PriceTable = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="pricing">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mt-[10rem]">
          Choose your plan
        </h1>
        <p className="text-md text-gray-500 mt-[4rem]">
          Experience the future of document interaction with GoAskPDF. Choose
          the plan that fits your needs and start engaging with your documents
          like never before.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800">Basic</h2>
            <p className="text-md text-gray-500 mt-2">
              Perfect for getting started with AI-enhanced documents at no cost.
              Includes basic features.
            </p>
          </div>
          <div className="p-8">
            <h3 className="text-lg font-semibold text-blue-600 text-center">
              FREE
            </h3>
            <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full">
              Join for free
            </button>
          </div>
          <ul className="list-none p-8">
            <li className="flex items-center mb-2">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">100 chats per month</span>
            </li>
            <li className="flex items-center mb-2">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">1 document per day</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">GPT-3.5 interactions</span>
            </li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800">Premium</h2>
            <p className="text-md text-gray-500 mt-2">
              Elevate your document interaction with unlimited chats, full
              conversation history, and priority support.
            </p>
          </div>
          <div className="p-8">
            <h3 className="text-lg font-semibold text-blue-600 text-center">
              $9.99/month
            </h3>
            <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full">
              Subscribe Now
            </button>
          </div>
          <ul className="list-none p-8">
            <li className="flex items-center mb-2">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                2500 pages per document (max 30MB)
              </span>
            </li>
            <li className="flex items-center mb-2">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">1200 questions per day</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">50 conversations per day</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">50 documents per day</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                GPT-3.5 & GPT-4 model (credits required)
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">Claude (Credits required)</span>
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800">Pro</h2>
            <p className="text-md text-gray-500 mt-2">
              Elevate your document interaction with unlimited chats, full
              conversation history, and priority support.
            </p>
          </div>
          <div className="p-8">
            <h3 className="text-lg font-semibold text-blue-600 text-center">
              $29.99/month
            </h3>
            <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full">
              Subscribe Now
            </button>
          </div>
          <ul className="list-none p-8">
            <li className="flex items-center mb-2">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                6000 pages per document (max 90MB)
              </span>
            </li>
            <li className="flex items-center mb-2">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                Unlimited questions & conversations per day
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                GPT-3.5 & GPT-4 model (credits required)
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                Claude & Claude 2 (Credits required)
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                Chat with multiple documents at once
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                Access to Summarisation Service
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">30 Free Credits</span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                Unlimited ChatGPT Plugin Question
              </span>
            </li>
            <li className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-gray-700">
                Longer Reply Length & priority access
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PriceTable;
