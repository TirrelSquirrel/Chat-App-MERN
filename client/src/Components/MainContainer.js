import React from 'react'
import './myStyles.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroups from './CreateGroups'
import Users_Groups from './Users_Groups'

function MainContainer() {
  return (
    <div className='main-container'>
        <Sidebar/>
        <Users_Groups />
        {/* <Welcome /> */}
        {/* <CreateGroups /> */}
        {/* <ChatArea props={{name: 'Test#1', timeStamp: 'today'}}/> */}
    </div>
  )
}

export default MainContainer