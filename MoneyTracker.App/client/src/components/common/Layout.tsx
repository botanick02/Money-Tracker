import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavigationMenu from "../common/NavigationMenu";
import TimeTravelAlert from "./TImeTravelAlert";
import TimeTravelPopup from "../TimeTravelPopup";

const Layout = () => {
  return (
    <>
      <TimeTravelPopup/>
      <TimeTravelAlert/>
      <Header />
      <Outlet />
      <NavigationMenu />
    </>
  );
};

export default Layout;
