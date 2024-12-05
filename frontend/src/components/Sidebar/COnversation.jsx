// import React from "react";

import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustand/useConversation";

const COnversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
          ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => {
          setSelectedConversation(conversation);
          // console.log(selectedConversation);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                conversation.profileImage
                  ? `http://localhost:5000/${conversation.profileImage}`
                  : conversation.profilePic
              }
              alt=""
            />
          </div>
        </div>
        <div className=" flexx flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider  my-o py-o h-1"></div>}
    </>
  );
};

export default COnversation;
