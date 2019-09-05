import React from 'react'
import { view } from 'react-easy-state'

import styles from './Advertisement.module.css'

const Advertisement = () => {
  return (
    <div className={styles.Advertisement}>
      <div>
        Best strawberries in town
      </div>
      <br />
      <div>
        call +1-202-555-0169
      </div>
    </div>
  )
}

export default view(Advertisement)