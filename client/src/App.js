import "./styles/App.css";
import React from "react";
import MainContainer from "./Components/Container/MainContainer";
import Login from "./Components/Pure/Forms/Login";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Pure/Welcome";
import ChatArea from "./Components/Pure/Conversations/ChatArea";
import Groups from "./Components/Pure/Groups/Groups";
import CreateGroups from "./Components/Pure/Groups/CreateGroups";
import Users from "./Components/Pure/Users/Users";
import ConversationsContainer from "./Components/Pure/Conversations/ConversationsContainer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="app" element={<MainContainer/>}>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="chat" element={<ChatArea/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="groups" element={<Groups/>}/>
          <Route path="create-groups" element={<CreateGroups/>}/>
          <Route path="conversations" element={<ConversationsContainer/>}/>
        </Route>
      </Routes>
      {/* <MainContainer />
      <Login /> */}
    </div>
  );
}

export default App;
