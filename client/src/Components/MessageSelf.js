import React from "react";
import { useSelector } from "react-redux";

function MessageSelf() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeThemeDarkerSelf = lighttheme ? "" : " darker-self";
  let props = { name: "You", message: "This is a Sample message" };

  return (
    <div className="self-message-container">
      <div className={"messageBox" + changeThemeDarkerSelf}>
        <p>{props.message}</p>
        <p className={"self-timeStamp" + changeThemeDarkerSelf}>12:00am</p>
      </div>
    </div>
  );
}

export default MessageSelf;
