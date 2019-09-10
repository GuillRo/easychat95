import React, { useState, useEffect } from 'react'

import Button from '../Button/Button'
import Input from '../Input/Input'

import { view } from 'react-easy-state'
import store from '../../store'

import styles from './LoggedUserFooter.module.css'

const user= store.user

const LoggedUserFooter = (props) => {

  const [inputValue, setInputValue] = useState('')
  const [customInputStyle, setCustomInputStyle] = useState('')

  useEffect(() => {
    if (customInputStyle !== '') {
      const timer = setTimeout(() => {
        setCustomInputStyle('')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [customInputStyle])

  const logout = () => {
    user.socket.emit('logout', user.username)
    user.updateUsername('')
    user.updateLogged(false)
  }

  const submit = event => {
    event.preventDefault()
    if (inputValue.toString().length > 0) {
      user.socket.emit('message', { username: user.username, inputValue, colorUser: user.colorUser, colorMsg: user.colorMsg, fontUser: user.fontUser, fontMsg: user.fontMsg })
    }
    else if (customInputStyle === '') {
      setCustomInputStyle(styles['Input-red'])
    }
    setInputValue('')
  }

  return (
    <div className={styles.LoggedUserFooter}>
      {/* <p>Connected as: {props.username}</p> */}
      <form onSubmit={e => { submit(e) }} className={styles.form}>
        <Input
          customStyle={[styles.Input, customInputStyle].join(' ')}
          placeholder="Say something edgy"
          value={inputValue}
          onChange={val => { setInputValue(val) }} />
        <Button>Send</Button>
      </form>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}


export default view(LoggedUserFooter)