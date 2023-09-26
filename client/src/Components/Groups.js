import React from "react";
import "./myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "../Images/chaticon-512.png";
import { useSelector } from "react-redux";

function Groups() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeDark = lighttheme ? "" : " dark";
  const changeDarker = lighttheme ? "" : " darker";

  return (
    <div className="list-container">
      <div className={"ug-header" + changeDark}>
        <img
          src={logo}
          style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          alt="Live Chat Logo"
        />
        <p className={"ug-title" + changeDark}>Grupos Disponibles</p>
      </div>

      <div className={"sb-search" + changeDark}>
        <IconButton>
          <SearchIcon className={changeDark} />
        </IconButton>
        <input placeholder="Buscar" className={"search-box" + changeDark} />
      </div>
      <div className={"ug-list" + changeDarker}>
        <div className={"list-item" + changeDark}>
          <p className={"con-icon" + changeDark}>T</p>
          <p className={"con-title" + changeDark}>Test Group</p>
        </div>
      </div>
    </div>
  );
}
// TODO: Seguir poniendo el dark theme
// TODO: Arreglar para mantener efectos hover y active

export default Groups;
