import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConversationsItem({ props }) {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  const changeThemeDarker = lighttheme ? "" : " darker";
  const navigate = useNavigate();
  return (
    <div className="conversation-container" onClick={() => navigate("chat")}>
      <p className={"con-icon" + changeThemeDarker}>{props.name[0]}</p>
      <p className={"con-title" + changeTheme}>{props.name}</p>
      <p className={"con-lastMessage" + changeTheme}>{props.lastMessage}</p>
      <p className={"con-timeStamp" + changeTheme}>{props.timeStamp}</p>
    </div>
  );
}

export default ConversationsItem;
