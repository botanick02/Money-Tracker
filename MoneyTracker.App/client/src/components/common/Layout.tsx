import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavigationMenu from "../common/NavigationMenu";
import TimeTravelAlert from "./TImeTravelAlert";

const Layout = () => {
  return (
    <>
      <TimeTravelAlert/>
      <Header />
      <Outlet />
      <NavigationMenu />
    </>
  );
};

export default Layout;
