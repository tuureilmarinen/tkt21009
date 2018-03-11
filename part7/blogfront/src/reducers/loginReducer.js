import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'
const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOFF':
    return null
  case 'INIT_USER':
    console.log("init_user",action.user)
    state = action.content
    return action.user
  default:
    return state
  }

}

export const login = (c) => {
    return async (dispatch) => {
      const user = await loginService.login(c)

      //debugger
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      //debugger
      dispatch({
        type: 'LOGIN',
        user
    })
  }
}

export const initializeUser = (user) => {
  //debugger
  return {
    type: 'INIT_USER',
    user
  }
}
export const logoff = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  console.log(window.localStorage.getItem('loggedBlogAppUser'))
  return {
    type: 'LOGOFF'
  }
}

export default reducer