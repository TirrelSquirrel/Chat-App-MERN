import React, {useState, useEffect} from "react";
import "../../../styles/myStyles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import logo from "../../../Images/chaticon-512.png";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import refresh from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Groups() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeText = lighttheme ? "" : " dark-text";

  const [groups, setGroups] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'))

  const navigate = useNavigate();

  if(!userData) {
    console.log('Usuario no autenticado')
    navigate(-1)
  }

  useEffect(() => {
    console.log("groups refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`
      }
    }

    axios.get('http://localhost:5000/chat/fetchGroups', config).then((data) => {
      console.log('Groups data from API', data);
      setGroups(data.data)
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
          <p className={"ug-title" + changeTheme}>Grupos Disponibles</p>
        </div>

        <div className={"sb-search" + changeTheme}>
          <IconButton>
            <SearchIcon className={changeTheme} />
          </IconButton>
          <input placeholder="Buscar" className={"search-box" + changeTheme} />
        </div>
        <div className="ug-list">
          {
            //TODO:Determinar los datos a mostrar una vez haya grupos

            groups.map((group, index) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={"list-item" + changeThemeHover}
                >
                  <p className={"con-icon" + changeTheme}>T</p>
                  <p className={"con-title" + changeThemeText}>Test Group</p>
                </motion.div>
              );
            })
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Groups;
