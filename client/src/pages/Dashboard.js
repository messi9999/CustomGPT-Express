import ChatBoard from "components/Chat/ChatBoard";
import Sidebar from "components/Sidebar";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className={`flex flex-row bg-[#fcf4e6]`}>
        <Sidebar />
        <ChatBoard />
      </div>
    </>
  );
}
