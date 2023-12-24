import CreateArea from "components/Create/CreateArea";
import Sidebar from "components/Sidebar";
import React from "react";

import ChatBoard from "components/Chat/ChatBoard";

export default function Create() {
  return (
    <>
      <div className={`flex flex-row bg-[#fcf4e6]`}>
        <Sidebar />
        <CreateArea />
        <ChatBoard />
      </div>
    </>
  );
}
