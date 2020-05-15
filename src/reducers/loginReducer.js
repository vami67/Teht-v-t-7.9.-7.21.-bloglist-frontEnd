import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import storage from '../utils/storage'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.userObject
    case 'INIT_USER':
      return action.userObject
    case 'LOGOUT':
      return null
    default:
      return state
  }

}

export const logout = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'

    })
  }
}

export const initUser = () => {
  return async dispatch => {
    const userObject = storage.loadUser()
    dispatch({
      type: 'INIT_USER',
      userObject
    })
  }
}

export const login = (credentialsObject) => {
  return async dispatch => {
    try {
      const userObject = await loginService.login(credentialsObject)
      storage.saveUser(userObject)
      dispatch({
        type: 'LOGIN',
        userObject
      })
      const notificationObject = {
        message: `${userObject.name} welcome back!`,
        type: 'success'
      }
      dispatch(setNotification(notificationObject, 5))
    } catch (exception) {
      const notificationObject = {
        message: 'wrong username/password',
        type: 'error'
      }
      dispatch(setNotification(notificationObject, 5))
    }

  }
}







export default userReducer