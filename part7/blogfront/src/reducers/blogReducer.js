import blogs from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    //debugger
    const old = store.filter(a => a._id !==action.id)
    const voted = store.find(a => a._id === action.id)
    //debugger
    const r = [...old, { ...voted, likes: voted.likes+1 } ]
    //debugger
    return r
  }
  if (action.type === 'CREATE') {
    console.log(action.content)
    return store.concat(action.content)
  }

  if (action.type === 'INITIALIZE') {
      //debugger
      //action.content
    return action.content 
  }

  return store
}

export const createBlog = (blogContent) => {
  return async (dispatch) => {
    const blog = await blogs.create(blogContent)
    dispatch({
      type: 'CREATE',
      content: blog
    })
  }
}

export const voteBlog = (blog) => {
  console.log("at voteBlog")
  //debugger
  const voted = { ...blog, likes: blog.likes + 1 }
  //debugger
  return async (dispatch) => {
    //debugger
    await blogs.update(blog._id, voted)
    //debugger
    console.log("dispatchign")
    dispatch({
      type: 'VOTE',
      id: blog._id
    })
  }
}
export const commentBlog = (blog,comment) => {
    const commented = { ...blog, comments: [ ...blog.comments, comment] }
    return async (dispatch) => {
      await blogs.update(blog.id, commented)
      dispatch({
        type: 'COMMENT',
        id: blog.id
      })
    }
  }

export const initializeBlogs = () => {
  return async (dispatch) => {
    //debugger
    const content = await blogs.getAll()
    //debugger
    dispatch({
      type: 'INITIALIZE',
      content
    })
  }
}

export default reducer