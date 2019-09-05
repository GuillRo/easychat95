import React, { useState, useEffect } from 'react'
import User from '../User/User'

import _ from 'lodash'

import styles from './ConnectedUsers.module.css'

import { view } from 'react-easy-state'
import store from '../../store'
const user = store.user

const ConnectedUsers = () => {

  const [fetched, setFetched] = useState(false)
  const [users, setUsers] = useState([])

  const fetchInitialData = async () => {
    const response = await fetch('/lastdata', { method: 'GET' })
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (!fetched) {
      fetchInitialData().then(data => {
        let usersArray = []
        data.usersOnline.forEach(user => usersArray.push(<User username={user.username} color={user.colorUser} />))
        setUsers(_.cloneDeep(usersArray))
        setFetched(true)
      })
    }

    user.socket.on('new user', (username, colorUser, colorMsg) => {
      let usersArray = users
      usersArray.push(<User username={username} color={colorUser} />)
      setUsers(_.cloneDeep(usersArray))
    })

    user.socket.on('logout', username => {
      // let usersArray = users
      // usersArray = _.without(usersArray, username)
      // setUsers(_.cloneDeep(usersArray))

      fetchInitialData().then(data => {
        let usersArray = []
        data.usersOnline.forEach(user => usersArray.push(<User username={user.username} color={user.colorUser} />))
        setUsers(_.cloneDeep(usersArray))
      })
    })

    user.socket.on('disconnect', () => {
      fetchInitialData().then(data => {
        let usersArray = []
        data.usersOnline.forEach(user => usersArray.push(<User username={user.username} color={user.colorUser} />))
        setUsers(_.cloneDeep(usersArray))
      })
    })
  })

  return (
    <>
      <div className={styles.ConnectedUsers}>
        {/* <div>john</div>
        <div>Tom</div> */}
        {users}
      </div>
    </>
  )
}


export default view(ConnectedUsers)