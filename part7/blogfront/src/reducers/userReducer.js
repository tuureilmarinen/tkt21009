import users from '../services/users'

const reducer = (store = [], action) => {

  if (action.type === 'CREATE_USER') {
    console.log(action.content)
    return store.concat(action.content)
  }

  if (action.type === 'INITIALIZE_USERS') {
    return store = action.content
  }

  return store
}

/*export const createUser = (userText) => {
  return async (dispatch) => {
    const user = await users.create(userText)
    dispatch({
      type: 'CREATE_USER',
      content: user
    })
  }
} */

export const initializeUsers = () => {
  return async (dispatch) => {
    const content = await users.getAll()
    dispatch({
      type: 'INITIALIZE_USERS',
      content
    })
  }
}

export default reducer