import DiscoverArea from "components/Discover/DiscoverArea";
import Sidebar from "components/Sidebar";
import React, { useContext } from "react";

import { ThemeContext } from "common/Context";
import ChatBoard from "components/Chat/ChatBoard";

export default function Discover() {
  const { theme } = useContext(ThemeContext);
  console.log(theme.bgColor);
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
