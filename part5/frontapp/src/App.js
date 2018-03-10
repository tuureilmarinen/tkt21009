import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogAuthor: "",
      newBlogName:"",
      newBlogURL:"",
      notification:""
    }
  }
  setNotification = (value)  => {
    this.setState({notification:value})
    setTimeout(()=>{
      this.setState({notification:""})
    },5000)
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggeBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  blogForm = () => (
    <div>
      <h2>Luo uusi ploki</h2>
  
      <form onSubmit={this.addBlog}>
      <input
          name="newBlogName"
          value={this.state.newBlogName}
          onChange={this.handleFieldChange}
        />
        <input
          name="newBlogURL"
          value={this.state.newBlogURL}
          onChange={this.handleFieldChange}
        />
        <input
          name="newBlogAuthor"
          value={this.state.newBlogAuthor}
          onChange={this.handleFieldChange}
        />
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
  loginForm = () => (
    <div>
      <h2>Login</h2>
  
      <form onSubmit={this.login}>
        <input
          name="username"
          value={this.state.username}
          onChange={this.handleFieldChange}
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleFieldChange}
        />
        <button type="submit">login</button>
      </form>
    </div>
  )


  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      noteService.setToken(user.token)
    }
  } 

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h1>{this.state.notification}</h1>
          <h2>Kirjaudu sovellukseen</h2>
          {loginForm()}
        </div>
      )
    }
  
    return (
      <div>
        <h1>{this.state.notification}</h1>
        <h2>blogs</h2>
        {this.state.blogs.sort((a,b)=>{a.likes-b.likes}).map(blog =>
          <Blog key={blog._id} blog={blog} delete={blogService.deleteBlog}/>
        )}
        {blogForm()}
        <button onClick={window.localStorage.removeItem('loggedBlogappUser')}>logout</button>}
      </div>
    )
  }
}

export default App;
