import React from 'react'

import { view } from 'react-easy-state'

import styles from './Logo.module.css'

const Logo = () => {
  return (
    <div className={styles["Logo-super"]}>
      <span>E</span>
      <span>A</span>
      <span>S</span>
      <span>Y</span>
      <span>C</span>
      <span>H</span>
      <span>A</span>
      <span>T</span>
      <span> </span>
      <span>9</span>
      <span>5</span>
    </div>
  )
}

export default view(Logo)