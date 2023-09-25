import React from 'react'
import './myStyles.css'
import Sidebar from './Sidebar'
/* import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'
import UsersGroups from './UsersGroups' */
import { Outlet } from "react-router-dom";


function MainContainer() {
  return (
    <div className='main-container'>
        <Sidebar/>
        <Outlet />
        {/* <UsersGroups /> */}
        {/* <Welcome /> */}
        {/* <CreateGroups /> */}
        {/* <ChatArea props={{name: 'Test#1', timeStamp: 'today'}}/> */}
    </div>
  )
}

export default MainContainer