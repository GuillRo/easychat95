import React from 'react'

import { view } from 'react-easy-state'
import styles from './User.module.css'

const User = (props) => {
  return (
    <p className={styles.User} style={{ color: props.color, fontFamily: props.font }}>{props.username}</p>
  )
}

export default view(User)