import React from 'react'
import { Link } from "react-router-dom"

import Logout from './LogOut'

const padding = { padding: 5 }

const naviStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  background: 'lightgrey',
  marginBottom: 5
}

const Navigation = () => {
  return (
    <div style={naviStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <Logout />
    </div>
  )
}

export default Navigation