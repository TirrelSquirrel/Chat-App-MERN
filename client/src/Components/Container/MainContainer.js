import React from "react";
import "../../styles/myStyles.css";
import Sidebar from "./Sidebar";
/* import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'
import UsersGroups from './UsersGroups' */
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function MainContainer() {
  const lighttheme = useSelector((state) => state.themeKey);

  const changeThemeDarker = lighttheme ? "" : " darker";

  return (
    <div className={"main-container" + changeThemeDarker}>
      <Sidebar />
      <Outlet />
      {/* <UsersGroups /> */}
      {/* <Welcome /> */}
      {/* <CreateGroups /> */}
      {/* <ChatArea props={{name: 'Test#1', timeStamp: 'today'}}/> */}
    </div>
  );
}

export default MainContainer;
