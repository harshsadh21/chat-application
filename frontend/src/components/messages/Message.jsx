// import React from "react";

import { useAuthContext } from "../../context/AuthContext";

import useConversation from "../../zustand/useConversation";
import { extractTimeFromISOString } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const dp = authUser.profileImage
    ? `http://localhost:5000/${authUser.profileImage}`
    : authUser.profilePic;
  const recDp = selectedConversation.profileImage
    ? `http://localhost:5000/${selectedConversation.profileImage}`
    : selectedConversation?.profilePic;
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? dp : recDp;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10  rounded-full">
          <img src={profilePic} alt="user profiles" />
        </div>
      </div>
      <div
        className={`chat-bubble   text-white ${bubbleBgColor} ${shakeClass}`}
      >
        {message.message ? (
          <div className={`chat-bubble text-white ${bubbleBgColor}`}>
            {message.message}
          </div>
        ) : (
          <div className="text-gray-500 italic">Empty message</div>
        )}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTimeFromISOString(message.createdAt).hours} :{" "}
        {extractTimeFromISOString(message.createdAt).minutes}
      </div>
    </div>
  );
};

export default Message;
