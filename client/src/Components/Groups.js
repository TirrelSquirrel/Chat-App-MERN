import React from "react";
import "./myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "../Images/chaticon-512.png";
import { useSelector } from "react-redux";

function Groups() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeText = lighttheme ? "" : " dark-text";

  return (
    <div className="list-container">
      <div className={"ug-header" + changeTheme}>
        <img
          src={logo}
          style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          alt="Live Chat Logo"
        />
        <p className={"ug-title" + changeTheme}>Grupos Disponibles</p>
      </div>

      <div className={"sb-search" + changeTheme}>
        <IconButton>
          <SearchIcon className={changeTheme} />
        </IconButton>
        <input placeholder="Buscar" className={"search-box" + changeTheme} />
      </div>
      <div className="ug-list">
        <div className={"list-item" + changeThemeHover}>
          <p className={"con-icon" + changeTheme}>T</p>
          <p className={"con-title" + changeThemeText}>Test Group</p>
        </div>
      </div>
    </div>
  );
}

export default Groups;
