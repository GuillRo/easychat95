import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import shortid from 'shortid'

import Message from '../Message/Message'

import styles from './ChatRoom.module.css'

import { view } from 'react-easy-state'
import store from '../../store'
const user = store.user

const ChatRoom = (props) => {

  const [chatMessages, setChatMessages] = useState([])
  const messagesEndRef = useRef(null)

  const fetchInitialData = async () => {
    const response = await fetch('/lastdata', { method: 'GET' })
    const data = await response.json()
    return data
  }

  // just to scroll to the bottom when too much messages
  // there is also a dummy div at the bottom of the return
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (chatMessages.length < 1) {
      fetchInitialData().then(data => {
        let lastMessages = []
        data['5'].forEach(msg => {
          lastMessages.push(<Message key={shortid.generate()} name={msg.username} text={msg.inputValue} colorUser={msg.colorUser} colorMsg={msg.colorMsg} fontUser={msg.fontUser} fontMsg={msg.fontMsg} />)
        })
        setChatMessages(lastMessages)
      })
    }
    user.socket.on('message', msg => {
      let msgArray = _.cloneDeep(chatMessages)
      msgArray.push(<Message key={shortid.generate()} name={msg.username} text={msg.inputValue} colorUser={msg.colorUser} colorMsg={msg.colorMsg} fontUser={msg.fontUser} fontMsg={msg.fontMsg} />)
      setChatMessages(msgArray)
    })
    scrollToBottom()
  })

  return (
    <div id="chatRoom" className={styles.ChatRoom}>
      {chatMessages}
      <div className="dummy-div-to-scroll-bottom" ref={messagesEndRef} />
    </div>
  )
}

export default view(ChatRoom)