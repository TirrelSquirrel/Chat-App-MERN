import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import refresh from "@mui/icons-material/Refresh";

function ConversationsContainer() {
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
  }, [refresh]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.2",
        }}
        className={"conversations-container" + changeTheme}
      >
        {conversations.map((conversation, index) => {
          let chatName = 'Error';
          if (conversation.isGroupChat) {
            chatName = conversation.chatName
          } else {
            if (conversation.users[0].name === userData.data.name) {
              chatName = conversation.users[1].name;
            } else {
              chatName = conversation.users[0].name;
            }
            
          }
          if (conversation.latestMessage === undefined) {
            return (
              <div
                key={index}
                className={"conversation-container" + changeThemeHover}
                onClick={() =>
                  navigate(
                    `chat/${conversation._id}&${chatName}`
                  )
                }
              >
                <p className={"con-icon" + changeThemeDarker}>
                  {chatName[0]}
                </p>
                <p className={"con-title" + changeThemeText}>
                  {chatName}
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
                  {chatName[0]}
                </p>
                <p className={"con-title" + changeThemeText}>
                  {chatName}
                </p>
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
      </motion.div>
    </AnimatePresence>
  );
}

export default ConversationsContainer;
