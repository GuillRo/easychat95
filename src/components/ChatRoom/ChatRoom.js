import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import shortid from 'shortid'

import Message from '../Message/Message'

import styles from './ChatRoom.module.css'

import { view } from 'react-easy-state'
import store from '../../store'
const user = store.user


const ChatRoom = (props) => {

  const [chatMessages, setChatMessages] = useState([])

  const fetchInitialData = async () => {
    const response = await fetch('/lastdata', { method: 'GET' })
    const data = await response.json()
    return data
  }


  useEffect(() => {
    if (chatMessages.length < 1) {
      fetchInitialData().then(data => {
        let arrayMsg = []
        data['5'].forEach(msg => {
          arrayMsg.push(<Message key={shortid.generate()} name={msg.username} text={msg.inputValue} colorUser={msg.colorUser} colorMsg={msg.colorMsg} fontUser={msg.fontUser} fontMsg={msg.fontMsg}/>)
        })
        setChatMessages(_.cloneDeep(arrayMsg))
      })
    }
    user.socket.on('message', msg => {
      let msgArray = chatMessages
      msgArray.push(<Message key={shortid.generate()} name={msg.username} text={msg.inputValue} colorUser={msg.colorUser} colorMsg={msg.colorMsg} fontUser={msg.fontUser} fontMsg={msg.fontMsg}/>)
      setChatMessages(_.cloneDeep(msgArray))
    })
  })

  return (
    <div className={styles.ChatRoom}>
    {/* <div className={styles.banner}>
Heyyy
    </div> */}
      {chatMessages}
    </div>
  )
}

export default view(ChatRoom)