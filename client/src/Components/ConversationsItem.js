import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConversationsItem({ props }) {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeDarker = lighttheme ? "" : " darker";
  const navigate = useNavigate();
  return (
    <div className={"conversation-container" + changeThemeHover} onClick={() => navigate("chat")}>
      <p className={"con-icon" + changeThemeDarker}>{props.name[0]}</p>
      <p className={"con-title" + changeThemeHover}>{props.name}</p>
      <p className={"con-lastMessage" + changeThemeHover}>{props.lastMessage}</p>
      <p className={"con-timeStamp" + changeThemeHover}>{props.timeStamp}</p>
    </div>
  );
}

//TODO:LA MIERDA DEL HOVER

export default ConversationsItem;
