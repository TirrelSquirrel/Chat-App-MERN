import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { refreshSidebarFun } from "../../../Features/refreshSidebar";
import {myContext} from '../../Container/MainContainer';

function SidebarConversations() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeDarker = lighttheme ? "" : " darker";
  const changeThemeText = lighttheme ? "" : " dark-text";

  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const {refresh, setRefresh} = useContext(myContext);


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
        let chatName = "Error";
        if (conversation.isGroupChat) {
          chatName = conversation.chatName;
        } else {
          if (conversation.users[0].name === userData.data.name) {
            chatName = conversation.users[1].name;
          } else {
            chatName = conversation.users[0].name;
          }
        }
        if (conversation.latestMessage === undefined) {
          return (
            <div key={index} onClick={() => {
              setRefresh(!refresh)
            }}>
              <div
                className={"conversation-container" + changeThemeHover}
                onClick={() => navigate(`chat/${conversation._id}&${chatName}`)}
              >
                <p className={"con-icon" + changeThemeDarker}>{chatName[0]}</p>
                <p className={"con-title" + changeThemeText}>{chatName}</p>
                <p className={"con-lastMessage" + changeThemeText}>
                  ¡Aún no hay mensajes!
                </p>
              </div>
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
              <p className={"con-icon" + changeThemeDarker}>{chatName[0]}</p>
              <p className={"con-title" + changeThemeText}>{chatName}</p>
              <p className={"con-lastMessage" + changeThemeText}>
                {conversation.latestMessage.content}
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
