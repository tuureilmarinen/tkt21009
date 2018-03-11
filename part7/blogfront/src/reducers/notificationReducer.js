const reducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.message
  case 'CLEAR':
    return ''
  default:
    return state
  }

}
  
export const notify = (message, time=10000) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    /*setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        message
      }, 10000)
    })*/
  }
}
export const clearNotification = () => {
  //debugger
  return (dispatch) => {
    //debugger
    dispatch({
      type: 'CLEAR'
    })
  }
}
  
export default reducer