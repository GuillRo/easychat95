import React from 'react'

import LoggedUserFooter from '../LoggedUserFooter/LoggedUserFooter'
import UnloggedUserFooter from '../UnloggedUserFooter/UnloggedUserFooter'

import style from './Footer.module.css'

import { view } from 'react-easy-state'
import store from '../../store'
const user = store.user

const Footer = () => {
  const footer = user.logged ? <LoggedUserFooter /> : <UnloggedUserFooter />
  return (
    <>
      {footer}
    </>
  )
}

export default view(Footer)