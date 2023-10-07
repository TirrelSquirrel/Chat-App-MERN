import React, {useEffect, useState} from "react";
import "../../../styles/myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../../../Images/chaticon-512.png";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import refresh from "@mui/icons-material/Refresh";

function Users() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeText = lighttheme ? "" : " dark-text";

  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'))

  const navigate = useNavigate();
  if(!userData) {
    console.log("Usuario no autenticado");
    navigate(-1);
  }

  useEffect(() => {
    console.log("users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`
      }
    };
    axios.get("http://localhost:5000/user/fetchUsers", config).then((data) => {
      console.log("User data from API ", data);
      setUsers(data.data)
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
        className="list-container"
      >
        <div className={"ug-header" + changeTheme}>
          <img
            src={logo}
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
            alt="Live Chat Logo"
          />
          <p className={"ug-title" + changeTheme}>Usuarios Online</p>
        </div>

        <div className={"sb-search" + changeTheme}>
          <IconButton>
            <SearchIcon className={changeTheme} />
          </IconButton>
          <input placeholder="Buscar" className={"search-box" + changeTheme} />
        </div>
        <div className="ug-list">
         {users.map((user, index) => {
          return (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={"list-item" + changeThemeHover}
              key={index}
              onClick={() => {
                console.log("Creando un chat con: ", user.name)
                const config = {
                  headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                  }
                };
                axios.post(
                  "http://localhost:5000/chat/",
                  {userId: user._id},
                  config
                )
              }}
            >
              <p className={"con-icon" + changeTheme}>{user.name[0]}</p>
              <p className={"con-title" + changeThemeText}>{user.name}</p>
            </motion.div>
          );
         })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Users;
