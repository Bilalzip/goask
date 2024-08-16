import React from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "How does it work?",
      answer:
        "Our AI-powered website allows you to chat with PDFs, ask relevant questions, and summarize documents. Simply upload your PDF and start conversing with it.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, our basic services are free to use. However, we also offer premium features and plans for more advanced needs.",
    },
    {
      question: "How secure is it?",
      answer:
        "We take data security seriously. Your documents are encrypted and stored securely. We adhere to strict privacy policies to ensure your information is protected.",
    },
    {
      question: "Can I collaborate with others?",
      answer:
        "Yes, you can easily collaborate with others by sharing access to your PDFs. Multiple users can chat, ask questions, and work together on the same document.",
    },
    {
      question: "How accurate is the summarization?",
      answer:
        "Our AI algorithms strive to provide accurate and concise summaries. However, the accuracy may vary depending on the complexity and content of the document.",
    },
  ];

  return (
    <div className="bg-black text-white p-8 lg:p-20" id="faqs">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Frequently Asked <br /> Questions
        </h1>
        <p className="mb-8">
          Find answers to common questions about our service, <br />{" "}
          capabilities, and usage.
        </p>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <button className="bg-yellow-500 text-black font-bold py-2 px-6 mb-8 lg:mb-[30rem] lg:mr-8">
            Contact
          </button>
          <div className="space-y-8 lg:w-[59.666667%] mt-[3rem]">
            {faqData.map((faq, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
