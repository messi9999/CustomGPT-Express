import DiscoverArea from "components/Discover/DiscoverArea";
import Sidebar from "components/Sidebar";
import React from "react";

import ChatBoard from "components/Chat/ChatBoard";

export default function Discover() {
  return (
    <>
      <div className={`flex flex-row bg-[#fcf4e6]`}>
        <Sidebar />
        <DiscoverArea />
        <ChatBoard />
      </div>
    </>
  );
}
