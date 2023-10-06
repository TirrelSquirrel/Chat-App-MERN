import React from "react";
import logo from "../Images/chaticon-512.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeThemeText = lighttheme ? "" : " dark-text";

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const navigate = useNavigate();
  if (!userData) {
    console.log("Usuario no autenticado");
    navigate("/");
  }

  return (
    <div className="welcome-container">
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 360 }}
        src={logo}
        alt="Live Chat Logo"
        className="welcome-logo"
      />
      <b className={changeThemeText}>Hola, {userData.data.name}</b>
      <p className={changeThemeText}>
        Envía y recibe mensajes de manera instantánea
      </p>
    </div>
  );
}

export default Welcome;
