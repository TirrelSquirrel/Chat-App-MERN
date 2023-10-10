import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ConversationsItem from "./ConversationsItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import refresh from "@mui/icons-material/Refresh";


function SidebarConversations() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";

    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      console.log("Usuario no autenticado");
      navigate(-1);
    }

    useEffect(() => {
      console.log("conversations refreshed");
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };

      axios.get("http://localhost:5000/chat/", config).then((data) => {
        console.log("Chat data from API", data);
        setConversations(data.data);
      });
    }, [refresh]);
  return (
    <div className={"sb-conversations" + changeTheme}>
      {conversations.map((conversation, index) => {
        return (
          <ConversationsItem props={conversation.users[index]} key={index} />
        );
      })}
    </div>
  );
}

export default SidebarConversations;
