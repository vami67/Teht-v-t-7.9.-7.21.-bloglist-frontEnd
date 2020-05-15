import userService from '../services/users'
const userReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const usersArray = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: usersArray
    })
  }
}

export default userReducer