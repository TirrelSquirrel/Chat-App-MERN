import React, { useState, useContext, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import MessageOthers from "../Messages/MessageOthers";
import MessageSelf from "../Messages/MessageSelf";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { myContext } from '../../Container/MainContainer'

function ChatArea() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeDarker = lighttheme ? "" : " darker";
  
  const [messageContent, setMessageContent] = useState('');
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split('&');

  const userData = JSON.parse(localStorage.getItem('userData'));
  const [allMessages, setAllMessages] = useState([]);

  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Messages refreshed');
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`
      }
    }

    axios.get('http://localhost:5000/message/' + chat_id, config).then(({data}) => {
      setAllMessages(data);
      setLoaded(true)
    })
  }, [refresh, chat_id, userData.data.token]);

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`
      }
    }

    axios.post(
      'http://localhost:5000/message/',
      {
        content: messageContent,
        chatId: chat_id
      },
      config
    )
      .then(({data}) => {
        console.log('Mensaje enviado');
      })
  }

  if(!loaded) {
    return (
      <div
        style={{
          border: '20px',
          padding: '10px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
        >
          <Skeleton
            variant="rectangular"
            sx={{width: '100%', borderRadius:'10px', flexGrow:'1'}}
          >
            <Skeleton
              variant="rectangular"
              sx={{width: '100%', borderRadius: '10px'}}
              height={60}
              />
          </Skeleton>
        </div>
    )
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
            {allMessages
              .slice(0)
              .reverse()
              .map((message, index) => {
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
                setMessageContent(e.target.value)
              }}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  sendMessage();
                  setMessageContent('');
                  setRefresh(!refresh)
                }
              }}
            />
            <IconButton onClick={() => {
              sendMessage();
              setRefresh(!refresh)
            }}>
              <SendIcon className={changeTheme} />
            </IconButton>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}
          //TODO:CREAR CLASE 'BOTTOM'
          //TODO:Check error en chat con usuario2

export default ChatArea;
