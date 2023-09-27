import React, { useState } from "react";
import "./myStyles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/themeSlice";

// Material Icons imports
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

//Components imports
import ConversationsContainer from "./ConversationsContainer";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";

  

  return (
    <div className="sidebar-container">
      <div className={"sb-header" + changeTheme}>
        <div>
          <IconButton>
            <AccountCircleIcon className={"icon" + changeTheme} />
          </IconButton>
        </div>

        <div className="other-icons">
          <IconButton onClick={() => navigate("users")}>
            <PersonAddIcon className={"icon" + changeTheme} />
          </IconButton>
          <IconButton onClick={() => navigate("groups")}>
            <GroupAddIcon className={"icon" + changeTheme} />
          </IconButton>
          <IconButton onClick={() => navigate("create-groups")}>
            <AddCircleIcon className={"icon" + changeTheme} />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {lighttheme ? (
              <NightlightIcon className={"icon" + changeTheme} />
            ) : (
              <LightModeIcon className={"icon" + changeTheme} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={"sb-search" + changeTheme}>
        <IconButton>
          <SearchIcon className={changeTheme} />
        </IconButton>
        <input placeholder="Buscar" className={"search-box" + changeTheme} />
      </div>
      <ConversationsContainer />
    </div>
  );
}

export default Sidebar;
