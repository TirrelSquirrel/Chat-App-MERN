import "./App.css";
import React from "react";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import Groups from "./Components/Groups";
import CreateGroups from "./Components/CreateGroups";
import Users from "./Components/Users";
import ConversationsContainer from "./Components/ConversationsContainer";

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
