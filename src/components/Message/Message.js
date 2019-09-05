import React from 'react'
import { view } from 'react-easy-state'

import styles from './Message.module.css'

const Message = (props) => {
  return (
    <div className={styles.Message}>
      <p style={{color: props.colorUser}}><strong>{props.name}: </strong></p>
      <p style={{color: props.colorMsg}}>{props.text}</p>
    </div>
  )
}

export default view(Message)