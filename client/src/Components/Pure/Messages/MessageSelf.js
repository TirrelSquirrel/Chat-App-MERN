import React from "react";
import { useSelector } from "react-redux";

function MessageSelf({props}) {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeThemeDarkerSelf = lighttheme ? "" : " darker-self";

  console.log(props)
  return (
    <div className="self-message-container">
      <div className={"messageBox" + changeThemeDarkerSelf}>
        <p>{props.content}</p>
{/*         <p className={"self-timeStamp" + changeThemeDarkerSelf}>12:00am</p>
 */}      </div>
    </div>
  );
}

export default MessageSelf;
