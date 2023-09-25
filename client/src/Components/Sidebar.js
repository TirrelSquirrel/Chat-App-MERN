import React, { useState } from "react";
import "./myStyles.css";
import { useNavigate } from "react-router-dom";

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
import ConversationsItem from "./ConversationsItem";

function Sidebar() {
  const navigate = useNavigate();
  const [lighttheme, setLightTheme] = useState(true);
  const changeTheme = lighttheme ? "" : " dark";
  const [conversations, setConversations] = useState([
    {
      name: "Test#1",
      lastMessage: "Last Message #1",
      timeStamp: "today",
    },
    {
      name: "Test#2",
      lastMessage: "Last Message #2",
      timeStamp: "today",
    },
    {
      name: "Test#3",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
  ]);

  return (
    <div className="sidebar-container">
      <div className={"sb-header" + changeTheme}>
        <div>
          <IconButton>
            <AccountCircleIcon className={"icon" + changeTheme} />
          </IconButton>
        </div>

        <div>
          <IconButton onClick={() => navigate("users")}>
            <PersonAddIcon className={"icon" + changeTheme} />
          </IconButton>
          <IconButton onClick={() => navigate("groups")}>
            <GroupAddIcon className={"icon" + changeTheme} />
          </IconButton>
          <IconButton onClick={() => navigate("create-groups")}>
            <AddCircleIcon className={"icon" + changeTheme} />
          </IconButton>
          <IconButton onClick={() => setLightTheme(!lighttheme)}>
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
      <div className={"sb-conversations" + changeTheme}>
        {conversations.map((conversation) => {
          return (
            <ConversationsItem props={conversation} key={conversation.name} />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
