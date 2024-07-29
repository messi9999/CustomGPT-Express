import ChatBoard from "components/Chat/ChatBoard";
import ProfileArea from "components/Profile/ProfileArea";
import Sidebar from "components/Sidebar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Profile() {
  const { pathname } = useLocation();
  return (
    <>
      <div className={`flex flex-row bg-[#fcf4e6]`}>
        <Sidebar />
        <ProfileArea />
        {pathname === "/profile" && <ChatBoard />}
        <Outlet />
      </div>
    </>
  );
}
