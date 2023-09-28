import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConversationsItem from "./ConversationsItem";

function SidebarConversations() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";

  const [conversations, setConversations] = useState([
    {
      name: "Test#1",
      lastMessage: "Last Message #1",
      timeStamp: "today",
    },
    {
      name: "Test#2",
      lastMessage: "Last Message #2",
      timeStamp: "today",
    },
    {
      name: "Test#3",
      lastMessage: "Last Message #3",
      timeStamp: "today",
    },
  ]);
  return (
    <div className={"sb-conversations" + changeTheme}>
      {conversations.map((conversation) => {
        return (
          <ConversationsItem props={conversation} key={conversation.name} />
        );
      })}
    </div>
  );
}

export default SidebarConversations;
