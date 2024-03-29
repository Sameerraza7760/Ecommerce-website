import { arrayUnion, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messegeData } from "types/types";
import useChat from "./../../hooks/useChat";
import './style.css';
function Chat() {
  const { sendMessegeToDb, getMessagesFromDb } = useChat();
  const Admin = useSelector((state?: any) => state?.admin?.admin);
  const User = useSelector((state?: any) => state?.user?.user);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<messegeData[]>([]);
  const [getMessege, setGetMessege] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSendMessege = async () => {
    const messageData: messegeData = {
      message: newMessage,
      email: User?.email,
      senderId: User.uid,
      receiverId: Admin.id,
      timestamp: serverTimestamp(),
      chatRoomId: {
        [Admin.id]: true,
        [User.uid]: true,
      },
      chatRoom: {
        message: [newMessage],
        timestamp: Date.now(),
      },
    };
    messageData.chatRoom.message = arrayUnion(newMessage);
    setGetMessege(true);
    await sendMessegeToDb(messageData);
    setNewMessage(" ");
  };
  const getMesseges = async () => {
    const unsubscribe = getMessagesFromDb(Admin.id, User.uid, (messages) => {
      console.log("Filtered Messages:", messages);
      if (messages) {
        setMessages(messages);
        setGetMessege(false);
      }
    });
  };
  useEffect(() => {
    getMesseges();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4 w-1/4">
        <ul>
          <li className="mb-2 cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300  text-center">
            <h3 className="adminNameChat font-semibold mb-4 text-lg">
              {" "}
              {Admin.email.replace(/\d+/g, "").split("@")[0]}
            </h3>
          </li>
        </ul>
      </div>

      {/* Chat Section */}
      <div className="bg-white p-4 shadow-md rounded-tl-md w-full h-[100vh] flex flex-col">
        <div className="flex items-center justify-between mb-4 h-auto">
          <h3 className="text-xl font-semibold text-gray-800">Live Chat</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/Shop")}
          >
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

        <div className="flex flex-col  space-y-2 h-[95%]">
          {Array.isArray(messages) &&
            messages.map(
              (item, index) =>
                Array.isArray(item.chatRoom.message) &&
                item.chatRoom.message.map((message, messageIndex) => (
                  <div
                    key={messageIndex}
                    className="flex items-start mt-2 gap-3 w-[100%]"
                  >
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src="https://via.placeholder.com/40"
                      alt="User"
                    />
                    <div
                      className={`flex items-start  ${
                        item.senderId === User.id
                          ? "bg-blue-200"
                          : "bg-green-200"
                      } p-3 rounded-lg w-[80%]`}
                    >
                      <p className="text-sm text-blue-800 font-semibold">
                        {message}
                      </p>
                    </div>
                  </div>
                ))
            )}
        </div>
        {/* Input Section */}
        <div className="mt-4 h-auto flex gap-2">
          <input
            type="text"
            className="w-[86%] p-3 border rounded-md focus:outline-none focus:border-blue-900"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessege}
            className=" bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none w-[150px] "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
