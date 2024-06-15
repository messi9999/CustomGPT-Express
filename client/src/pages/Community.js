import React from 'react'
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from 'components/Community/Sidebar';
import CommunityCom from "components/Community/CommunityCom"

export default function Community() {

  return (
    <>
      <Sidebar/>
      <Outlet />
    </>
  )
}
