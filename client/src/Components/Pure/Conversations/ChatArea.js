import React, { useState, useContext, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import MessageOthers from "../Messages/MessageOthers";
import MessageSelf from "../Messages/MessageSelf";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@mui/material/Skeleton";
import axios, { all } from "axios";
import { myContext } from "../../Container/MainContainer";
import { io } from "socket.io-client";

var socket, chat;
function ChatArea() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeDarker = lighttheme ? "" : " darker";

  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState(false);

  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:5000/");
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if (!allMessagesCopy || !allMessagesCopy._id !== newMessage._id) {
        return;
      } else {
        setAllMessages([...allMessages], newMessage);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Messages refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    axios
      .get("http://localhost:5000/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setLoaded(true);
        socket.emit("join chat", chat._id);
      });
    setAllMessagesCopy(allMessages);
  }, [refresh, chat_id, userData.data.token]);

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    console.log("MESSAGE CONTENT", messageContent);
    console.log("CHAT ID", chat_id);

    axios
      .post(
        "http://localhost:5000/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        console.log("Mensaje enviado");
        setMessageContent("");
      });
  };

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px", flexGrow: "1" }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", borderRadius: "10px" }}
            height={60}
          />
        </Skeleton>
      </div>
    );
  } else {
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
            <p className={"con-icon" + changeThemeDarker}>{chat_user[0]}</p>
            <div className={"header-text" + changeTheme}>
              <p className={"con-title" + changeTheme}>{chat_user}</p>
              {/*             <p className={"con-timeStamp" + changeTheme}>{props.timeStamp}</p>
               */}{" "}
            </div>
            <IconButton>
              <DeleteIcon className={changeTheme} />
            </IconButton>
          </div>
          <div className={"messages-container" + changeTheme}>
            {allMessages.slice(0).map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOthers props={message} key={index} />;
              }
            })}
          </div>
          <div ref={messagesEndRef} className="BOTTOM" />
          <div className={"text-input-area" + changeTheme}>
            <input
              placeholder="Escribe un mensaje..."
              className={"search-box" + changeTheme}
              value={messageContent}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  sendMessage();
                  setMessageContent("");
                  setRefresh(!refresh);
                }
              }}
            />
            <IconButton
              onClick={() => {
                sendMessage();
                setRefresh(!refresh);
              }}
            >
              <SendIcon className={changeTheme} />
            </IconButton>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}
//TODO:CREAR CLASE 'BOTTOM'

export default ChatArea;
