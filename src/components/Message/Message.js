import React from 'react'
import { view } from 'react-easy-state'

import styles from './Message.module.css'

const Message = (props) => {
  return (
    <div className={styles.Message}>
      <p className={styles.username} style={{ color: props.colorUser, fontFamily: props.fontUser }}><strong>{props.name}: </strong></p>
      <p className={styles.body} style={{ color: props.colorMsg, fontFamily: props.fontMsg }}>{props.text}</p>
    </div>
  )
}

export default view(Message)