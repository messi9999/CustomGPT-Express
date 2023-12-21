import React from "react";
// import SidebarItem from "./SidebarItem";

import { ReactComponent as DiscoverIcon } from "assets/icons/discover-icon.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/profile.svg";
import { NavLink, useLocation } from "react-router-dom";

const routes = [
  {
    to: "/discover",
    title: "Docover",
    icon: DiscoverIcon,
  },
  {
    to: "/profile",
    title: "Profile",
    icon: ProfileIcon,
  },
];

function SidebarItem({ to, icon, children }) {
  const { pathname } = useLocation();

  const classes =
    "mb-1 flex h-20 w-20 flex-col items-center justify-center rounded-xl text-neutral-900 hover:bg-neutral-300 hover:text-neutral-600 active:bg-neutral-200 active:text-neutral-900-tap cursor-pointer";

  const Icon = icon;
  return (
    <NavLink
      to={pathname !== to ? to : "/dashboard"}
      className={`${classes} ${pathname === to ? "bg-neutral-300" : ""}`}
    >
      <Icon className="w-8 h-8" />
      <span>{children}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <div>
      <div className="hidden w-26 h-screen flex-col items-center border-r border-neutral-300 p-3 pt-5 lg:flex">
        {routes.map((route, idx) => (
          <SidebarItem key={`sidebar-item-${idx}`} {...route}>
            {route.title}
          </SidebarItem>
        ))}
      </div>
    </div>
  );
}