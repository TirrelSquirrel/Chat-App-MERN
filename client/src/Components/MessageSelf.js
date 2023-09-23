import React from "react";

function MessageSelf() {
  let props = { name: "You", message: "This is a Sample message" };

  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p>{props.message}</p>
        <p className="self-timeStamp">12:00am</p>
      </div>
    </div>
  );
}

export default MessageSelf;
