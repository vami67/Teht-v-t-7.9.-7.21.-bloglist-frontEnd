const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notificationObject
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }

}

export const setNotification = (notificationObject, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notificationObject
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, timeout * 1000)
  }
}


export default notificationReducer