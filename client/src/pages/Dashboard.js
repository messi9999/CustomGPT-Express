import { ThemeContext } from "common/Context";
import ChatBoard from "components/Chat/ChatBoard";
import Sidebar from "components/Sidebar";
import React, { useContext } from "react";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`flex flex-row bg-[#fcf4e6]`}>
        <Sidebar />
        <ChatBoard />
      </div>
    </>
  );
}
