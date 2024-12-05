// import React from "react";

import MessageCon from "../components/messages/MessageCon";
import Sidebar from "../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageCon />
    </div>
  );
};

export default Home;
