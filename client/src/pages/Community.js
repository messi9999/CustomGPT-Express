import React from 'react'
import { Outlet } from "react-router-dom";

// import Sidebar from 'components/Community/Sidebar';
import TitleBar from 'components/Community/TitleBar';
import Sidebar from 'components/Sidebar';


export default function Community() {

  return (
    <>
      <div className={`flex flex-row bg-[#fcf4e6] h-screen`}>
        <Sidebar />
        <div className='w-full overflow-none h-screen'>
          <TitleBar />
          <Outlet />
        </div>
      </div>
    </>
  )
}
