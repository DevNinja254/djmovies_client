import React from 'react'
import { NavLink } from 'react-router-dom'
import Navlink from '../components.jsx/account/Navlink'
const Account = ({children}) => {
  return (
    <div>
        <Navlink/>
        {children}
    </div>
  )
}

export default Account