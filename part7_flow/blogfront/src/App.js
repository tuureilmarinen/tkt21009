// @flow
import React from 'react'
import Blog from './components/Blog'
import AdvancedBlog from './components/AdvancedBlog'
import UserList from './components/UserList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      blogs: [],
      user: null,
      username: '',
      password: '', 
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    userService.getAll().then(users =>
      this.setState({ users })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  notify = (message: string, type = 'info') => {
    this.setState({
      notification: {
        message, type
      }
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })     
    }, 10000)
  }

  like = (id:string) => async () => {
    const liked = this.state.blogs.find(b=>b._id===id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  remove = (id:string) => async () => {
    const deleted = this.state.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }

    await blogService.remove(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.setState({
      blogs: this.state.blogs.filter(b=>b._id!==id)
    })
  }

  addBlog = async (event:object) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }
    
    const result = await blogService.create(blog) 
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({ 
      title: '', 
      url: '', 
      author: '',
      blogs: this.state.blogs.concat(result)
    })
  }

  addComment = async (event:object) => {
    event.persist()
    event.preventDefault()
    //event.presist()
    const blogId=event.target.blog_id.value
    await blogService.newComment(blogId,event.target.comment.value)
    //const blog=this.blogById(blogId)
    const blogs = await blogService.getAll()
    this.setState({blogs})
    event.target.comment.value=""


  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event:object) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userById = (id:string) => {
    const list = this.state.users.filter(u=>u._id==id)
    //debugger
    if(list.length===0){
      return null
    } else {
      return list[0]
    }
  }
  blogById = (id:string) => {
    const list = this.state.blogs.filter(u=>u._id==id)
    //debugger
    if(list.length===0){
      return null
    } else {
      return list[0]
    }
  }


  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification notification={this.state.notification} />
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.state.blogs.sort(byLikes)
    console.log(this.state.users)
    return (
      <div>
        <Router>
          <div>
            
            <nav class="navbar navbar-default navbar-fixed-top">
              <div class="container">
                <ul class="nav navbar-nav">
                  <li><Link to="/">home</Link></li>
                  <li><Link to="/users">users</Link></li>
                  <li><Link to="/blogs">blogs</Link></li>
                  <li>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></li>
                </ul>
              </div>
            </nav>
            <br/><br/><br/><br/><br/>
            <Notification notification={this.state.notification} />
            <Togglable buttonLabel='uusi blogi' class="btn btn-primary">
              <BlogForm 
                handleChange={this.handleLoginChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
              />
            </Togglable>
            <Route exact path="/users/:id" render={({match}) => (
              <div>
                { this.userById(match.params.id)!=null &&
                  <User user={this.userById(match.params.id)} />
                }
              </div>
            )} />
            <Route path="/users" render={() => (
              <div>
                <h2>Users</h2>
                <UserList users={this.state.users} />
              </div>
            )} />
            <Route exact path="/blogs/:id" render={({match}) => (
              <div>
                { this.blogById(match.params.id) &&
                  <AdvancedBlog blog={this.blogById(match.params.id)} handleSubmit={this.addComment} />
                }
              </div>
            )}/>
            <Route path="/blogs" render={({match}) => (
              <div>
                <h2>blogs</h2>
                {blogsInOrder.map(blog => 
                  <Blog 
                    key={blog._id} 
                    blog={blog} 
                    like={this.like(blog._id)}
                    remove={this.remove(blog._id)}
                    deletable={blog.user === undefined || blog.user.username === this.state.user.username}
                  />
                )}
              </div>
          )}/>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;