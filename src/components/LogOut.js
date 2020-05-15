import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { logout } from '../reducers/loginReducer'

const LogOut = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <>{user.name} logged in <button onClick={handleLogout}>logout</button></>
  )

}

export default LogOut