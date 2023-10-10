import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConversationsItem({ props }) {
    
  const lighttheme = useSelector((state) => state.themeKey);
  const changeThemeHover = lighttheme ? "" : " dark-hover";
  const changeThemeDarker = lighttheme ? "" : " darker";
  const changeThemeText = lighttheme ? "" : " dark-text";

  const navigate = useNavigate();
  return (
    <div
      className={"conversation-container" + changeThemeHover}
      onClick={() => navigate("/app/chat")}
    >
      <p className={"con-icon" + changeThemeDarker}>{props.name[0]}</p>
      <p className={"con-title" + changeThemeText}>{props.name}</p>
      <p className={"con-lastMessage" + changeThemeText}>{props.lastMessage}</p>
      <p className={"con-timeStamp" + changeThemeText}>{props.timeStamp}</p>
    </div>
  );
}

export default ConversationsItem;
