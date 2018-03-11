import React from 'react'
import Blog from './components/Blog'
import AdvancedBlog from './components/AdvancedBlog'
import UserList from './components/UserList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm';
import { login,logoff } from './reducers/loginReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //users: [],
      //blogs: [],
      //user: null,
      username: '',
      password: '', 
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  componentWillMount = async () => {
    /*blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    userService.getAll().then(users =>
      this.setState({ users })
    )*/
    //logins.initUser()
    //this.props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    let user=null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      console.log("inited user")
    }
    this.props.initializeBlogs()
    this.props.initializeUsers()
    this.props.initializeUser(user)

  } 
  componentDidMount() {

  }

  notify = (message, type = 'info') => {
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

  like = (id) => async () => {
    const liked = this.state.blogs.find(b=>b._id===id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  remove = (id) => async () => {
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

  addBlog = async (event) => {
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

  addComment = async (event) => {
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
    this.props.logoff()
    this.setState({user:null})

    //this.notify('logged out')
    //this.setState({ user: null })
  }

  login = async (event) => {
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

  userById = (id) => {
    const list = this.state.users.filter(u=>u._id==id)
    //debugger
    if(list.length===0){
      return null
    } else {
      return list[0]
    }
  }
  blogById = (id) => {
    const list = this.state.blogs.filter(u=>u._id==id)
    //debugger
    if(list.length===0){
      return null
    } else {
      return list[0]
    }
  }


  render() {
    if (!window.localStorage.getItem('loggedBlogAppUser')) {
      console.log(this.state)
      return (
        <LoginForm handleChange={this.handleLoginChange} />
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    //const blogsInOrder = this.state.blogs.sort(byLikes)
    //console.log(this.state.users)
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
                  <li><button className="btn btn-primary" onClick={this.logout}>logout</button></li>
                </ul>
              </div>
            </nav>
            <br/><br/><br/><br/><br/>
            
            <Togglable buttonLabel='uusi blogi' class="btn btn-primary">
              <BlogForm 
                handleChange={this.handleLoginChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
              />
            </Togglable>
            <Notification />
            <Route exact path="/users/:id" render={({match}) => (
              <div>
                { match.params.id &&
                  <User id={match.params.id} />
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
                { match.params.id &&
                  <AdvancedBlog id={match.params.id} />
                }
              </div>
            )}/>
            <Route path="/blogs" render={({match}) => (
              <BlogList />
            )}/>

          </div>
        </Router>
      </div>
    );
  }
}


export default connect(null, { initializeBlogs, initializeUsers, initializeUser,logoff,login })(App)