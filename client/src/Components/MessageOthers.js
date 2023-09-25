import React from 'react'

function MessageOthers() {
  let props = { name:'Random User', message: 'This is a Sample message'}
  return (
    <div className="other-message-container">
      <div className="conversation-container">
        <p className="con-icon">{props.name[0]}</p>
        <div className="other-text-content">
          <p className="con-title">{props.name}</p>
          <p className="con-lastMessage">{props.message}</p>
          <p className="self-timeStamp">12:00am</p>
        </div>
      </div>
    </div>
  );
}

export default MessageOthers