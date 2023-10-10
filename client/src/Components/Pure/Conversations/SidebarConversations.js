import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SidebarConversations() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeDarker = lighttheme ? "" : " darker";
  const changeThemeText = lighttheme ? "" : " dark-text";

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
  }, []);
  return (
    <div className={"sb-conversations" + changeTheme}>
      {conversations.map((conversation, index) => {
        if (conversation.latestMessage == undefined) {
          return (
            <div
              key={index}
              className={"conversation-container" + changeThemeHover}
              onClick={() =>
                navigate(
                  `chat/${conversation._id}&${conversation.users[1].name}`
                )
              }
            >
              <p className={"con-icon" + changeThemeDarker}>
                {conversation.users[1].name[0]}
              </p>
              <p className={"con-title" + changeThemeText}>
                {conversation.users[1].name}
              </p>
              <p className={"con-lastMessage" + changeThemeText}>
                ¡Aún no hay mensajes!
              </p>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className={"conversation-container" + changeThemeHover}
              onClick={() =>
                navigate(
                  `chat/${conversation._id}&${conversation.users[1].name}`
                )
              }
            >
              <p className={"con-icon" + changeThemeDarker}>
                {conversation.users[1].name[0]}
              </p>
              <p className={"con-title" + changeThemeText}>
                {conversation.users[1].name}
              </p>
              <p className={"con-lastMessage" + changeThemeText}>
                {conversation.users[1].lastMessage}
              </p>
              <p className={"con-timeStamp" + changeThemeText}>
                {conversation.users[1].timeStamp}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default SidebarConversations;
