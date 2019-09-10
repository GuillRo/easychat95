import React, { useState, useEffect } from 'react'

import MainLayout from './layouts/MainLayout/MainLayout'
import ChatRoom from './components/ChatRoom/ChatRoom'
import ConnectedUsers from './components/ConnectedUsers/ConnectedUsers'
import Logo from './components/Logo/Logo'
import Advertisement from './components/Advertisement/Advertisement'
import Footer from './components/Footer/Footer'

import { view } from 'react-easy-state'
import store from './store'

import io from 'socket.io-client'
const socket = io.connect()
const user = store.user


const App = (props) => {
  
  user.updateSocket(socket)
  // const [userList, setUserList] = useState([])
  return (
    // {footer}
    <MainLayout
      advertisement={<Advertisement />}
      logo={<Logo />}
      chatRoom={<ChatRoom />}
      connectedUsers={<ConnectedUsers />}
    >
      <Footer />
    </MainLayout>
  )
}

export default view(App)
