import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { view } from 'react-easy-state'
import store from '../../store'

import Button from '../Button/Button'
import Input from '../Input/Input'

import styles from './UnloggedUserFooter.module.css'

const user = store.user


const UnloggedUserFooter = (props) => {

  const [username, setUsername] = useState(user.username)
  const [customInputStyle, setCustomInputStyle] = useState('')
  const colors = ['red', 'purple', 'violet', 'blue', 'darkcyan', 'brown', 'indigo', 'green', 'magenta', 'teal']

  useEffect(() => {
    if (customInputStyle !== '') {
      const timer = setTimeout(() => {
        setCustomInputStyle('')
      }, 1500)
      return () => clearTimeout(timer)
    }

  }, [customInputStyle])


  const alreadyTaken = async username => {
    const response = await fetch('/lastdata', { method: 'GET' })
    const data = await response.json()
    return data.usersOnline.map(user => user.username)
  }

  const login = async (event) => {
    event.preventDefault()
    if (username.toString().length > 0) {
      const userlist = await alreadyTaken(username)
      if (!_.includes(userlist, username)) {
        user.updateUsername(username)
        user.updateColorUser(colors[Math.floor(Math.random() * colors.length)])
        user.updateColorMsg(colors[Math.floor(Math.random() * colors.length)])
        user.socket.emit('new user', user.username, user.colorUser, user.colorMsg)
        user.updateLogged(true)
      } else {
        alert(' username already taken')
        setUsername('')
      }

    } else if (customInputStyle === '') {
      setCustomInputStyle(styles['Input-red'])
    }
  }

  return (
    <form onSubmit={e => login(e)} className={styles.UnloggedUserFooter}>
      <Input placeholder="username" onChange={val => setUsername(val)} value={username} customStyle={customInputStyle} />
      <Button>Log in</Button>
    </form>
  )
}

export default view(UnloggedUserFooter)
