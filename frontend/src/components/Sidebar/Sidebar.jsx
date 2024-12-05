// import React from "react";
// import COnversation from "./COnversation";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import Searchinput from "./Searchinput";

const Sidebar = () => {
  return (
    <div className="border-slate-500  p-4 flex flex-col">
      <Searchinput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
