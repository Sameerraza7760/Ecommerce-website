import React from "react";

function AdminChat() {
  const customerNames = ["Customer 1", "Customer 2", "Customer 3"]; // Your customer names
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 w-1/4">
        <h3 className="text-2xl font-semibold mb-4">Customer List</h3>
        <ul>
          {customerNames.map((name, index) => (
            <li
              key={index}
              className="mb-2 cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="bg-white p-4 shadow-md rounded-tl-md w-full h-[100vh] flex flex-col">
        <div className="flex items-center justify-between mb-4 h-auto">
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
              ></path>
            </svg>
          </button>
        </div>
        {/* Chat Content */}
        <div className="flex flex-col space-y-4 h-[95%]">
          {/* Sample Chat Messages */}
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
        {/* Input Section */}
        <div className="mt-4 h-auto flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-[90%] p-3 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button className="mt-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none w-[10%] ">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;
