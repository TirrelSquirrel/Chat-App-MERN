import "./App.css";
import React from "react";
import MainContainer from "./Components/MainContainer";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import UsersGroups from "./Components/UsersGroups";
import CreateGroups from "./Components/CreateGroups";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="app" element={<MainContainer/>}>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="chat" element={<ChatArea/>}/>
          <Route path="users" element={<UsersGroups/>}/>
          <Route path="groups" element={<UsersGroups/>}/>
          <Route path="create-groups" element={<CreateGroups/>}/>
        </Route>
      </Routes>
      {/* <MainContainer />
      <Login /> */}
    </div>
  );
}

export default App;
