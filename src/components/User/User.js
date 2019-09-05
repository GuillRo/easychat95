import React from 'react'

import { view } from 'react-easy-state'

const User = (props) => {
  return(
    <p style={{color: props.color}}>{props.username}</p>
  )
}

export default view(User)