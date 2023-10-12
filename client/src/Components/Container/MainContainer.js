import React, {createContext, useState} from "react";
import "../../styles/myStyles.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const myContext = createContext();
function MainContainer() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeThemeDarker = lighttheme ? "" : " darker";

  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(true);

  return (
    <div className={"main-container" + changeThemeDarker}>
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Outlet />
      </myContext.Provider>
    </div>
  );
}

export default MainContainer;
