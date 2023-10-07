import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import MessageOthers from "../Messages/MessageOthers";
import MessageSelf from "../Messages/MessageSelf";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

function ChatArea() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeDarker = lighttheme ? "" : " darker";
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

  let props = conversations[0];
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
        className="chatArea-container"
      >
        <div className={"chatArea-header" + changeTheme}>
          <p className={"con-icon" + changeThemeDarker}>{props.name[0]}</p>
          <div className={"header-text" + changeTheme}>
            <p className={"con-title" + changeTheme}>{props.name}</p>
            <p className={"con-timeStamp" + changeTheme}>{props.timeStamp}</p>
          </div>
          <IconButton>
            <DeleteIcon className={changeTheme} />
          </IconButton>
        </div>
        <div className={"messages-container" + changeTheme}>
          <MessageOthers />
          <MessageSelf />
        </div>
        <div className={"text-input-area" + changeTheme}>
          <input
            placeholder="Escribe un mensaje..."
            className={"search-box" + changeTheme}
          />
          <IconButton>
            <SendIcon className={changeTheme} />
          </IconButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ChatArea;
