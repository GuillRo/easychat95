import React from 'react'
import Split from 'react-split'
import MediaQuery from 'react-responsive'

import { view } from 'react-easy-state'

import styles from './MainLayout.module.css'

const MainLayout = (props) => {
  return (
    <>
      <div className={styles.container}>
        {/* <div className={[styles.container, styles.crt].join(' ')}> */}
        <header className={[styles.row, styles.header].join(' ')}>
          {props.logo}
          {props.advertisement}
        </header>

        <div className={[styles.row, styles.center].join(' ')}>
          <MediaQuery query="(min-width: 726px)">
            <Split
              sizes={[85, 15]}
              style={{ display: 'flex', flex: '1 1 auto' }}>
              {props.chatRoom}
              {props.connectedUsers}
            </Split>
          </MediaQuery>
          <MediaQuery query="(max-width:725px)">
            {props.chatRoom}
          </MediaQuery>
        </div>

        <footer className={[styles.row, styles.footer].join(' ')}>
          {props.children}
        </footer>
      </div>
    </>
  )
}

export default view(MainLayout)
