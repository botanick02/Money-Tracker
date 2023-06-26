import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavigationMenu from "../common/NavigationMenu";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <NavigationMenu />
    </>
  );
};

export default Layout;
