import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ConversationsItem from "./ConversationsItem";
import {motion, AnimatePresence} from 'framer-motion'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import refresh from "@mui/icons-material/Refresh";


function ConversationsContainer() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";

  const navigate = useNavigate()

  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));


  if(!userData) {
    console.log("Usuario no autenticado");
    navigate(-1)
  }

  useEffect(() => {
    console.log('conversations refreshed')
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`
      }
    };

    axios.get("http://localhost:5000/chat/", config).then((data) => {
      console.log('Chat data from API', data);
      setConversations(data.data)
    })
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
          return (
            <ConversationsItem props={conversation.users[index]} key={index} />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default ConversationsContainer;
