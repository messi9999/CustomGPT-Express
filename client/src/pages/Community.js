import React from 'react'
import { Outlet } from "react-router-dom";

import Sidebar from 'components/Community/Sidebar';

export default function Community() {

  return (
    <>
      <Sidebar/>
      <Outlet />
    </>
  )
}
