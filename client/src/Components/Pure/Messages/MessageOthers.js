import React from "react";
import { useSelector } from "react-redux";

function MessageOthers({props}) {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeThemeDarker = lighttheme ? "" : " darker";
  const changeThemeHover = lighttheme ? "" : " dark-hover";

  return (
    <div className="other-message-container">
      <div className={"conversation-container" + changeThemeHover}>
        <p className={"con-icon" + changeThemeDarker}>{props.name[0]}</p>
        <div className={"other-text-content" + changeThemeDarker}>
          <p className={"con-title" + changeThemeDarker}>{props.name}</p>
          <p className={"con-lastMessage" + changeThemeDarker}>
            {props.content}
          </p>
{/*           <p className={"self-timeStamp" + changeThemeDarker}>12:00am</p>
 */}        </div>
      </div>
    </div>
  );
}

export default MessageOthers;
