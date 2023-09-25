import React from "react";
import "./myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "../Images/chaticon-512.png";

function UsersGroups() {
  return (
    <div className="list-container">
      <div className="ug-header">
        <img
          src={logo}
          style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          alt="Live Chat Logo"
        />
        <p className="ug-title">Usuarios Online</p>
      </div>

      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input placeholder="Buscar" className="search-box" />
      </div>
      <div className="ug-list">
        <div className="list-item">
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
        </div>
      </div>
    </div>
  );
}

export default UsersGroups;
