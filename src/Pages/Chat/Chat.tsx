import React from "react";

function Chat() {
  return (
    <div className="bg-white p-4 shadow-md rounded-tl-md w-full h-[80vh]">
    <div className="flex items-center justify-between mb-4 h-auto ">
      <h3 className="text-xl font-semibold text-gray-800">Live Chat</h3>
      <button className="text-gray-500 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div className="flex flex-col space-y-4 h-[95%]">
      <div className="flex items-start">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://via.placeholder.com/40"
          alt="User"
        />
        <div className="ml-3 bg-blue-100 p-3 rounded-lg w-3/4">
          <p className="text-sm text-blue-800 font-semibold">
            Hi! How can I help you today?
          </p>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <div className="bg-green-500 text-white p-3 rounded-lg w-3/4">
          <p className="text-sm">Sure! I can assist you with that.</p>
        </div>
        <img
          className="h-10 w-10 rounded-full object-cover ml-3"
          src="https://via.placeholder.com/40"
          alt="User"
        />
      </div>
    </div>
    <div className="mt-4 h-auto">
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <button className="mt-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none">
        Send
      </button>
    </div>
  </div>
  );
}

export default Chat;
