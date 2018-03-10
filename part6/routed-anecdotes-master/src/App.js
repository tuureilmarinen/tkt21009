import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import {ListGroup, ListGroupItem, Col, Row, Grid} from 'react-bootstrap'

const Menu = () => (
  <div style={{textAlign:"center",backgroundColor:"black",color:"white",padding:10}}>    
    <Link style={{display:"inline-block",color:"white"}} to="/">about</Link> &nbsp;
    <Link style={{display:"inline-block",color:"white"}} to="/anecdotes">anecdotes</Link> &nbsp;
    <Link style={{display:"inline-block",color:"white"}} to="/new">users</Link>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup> 
  </div>
)
const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.author}</h2>
    <div>{anecdote.content}</div>
    <Link to={anecdote.info}>{anecdote.info}</Link>
    <div><strong>{anecdote.votes}</strong> votes</div>
  </div>
)}

const Notification =({notification})=>{
  const style = notification.length>0 ? {
    border: 'solid',
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: '10px',
    color: 'pink',
    fontFamily: 'monospace',
    margin: '10px'
  } : { visibility: 'hidden'}
  return (
    <div style={style}>
      {notification}
    </div>
  )
}



const About = () => (
  <Grid>
    <Row className="show-grid">
    <Col md={8}>
      <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
    </Col>
    <Col style={{display:"flex"}} md={4}>
      <img style={{}} alt="Linus Torvalds" src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg"/>
    </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      fireRedirect: false,
      notification: ""
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.setNotification(`added ${this.state.content}`,10)
    this.setState({content:"",author:"",info:"", fireRedirect:true})
  }

  render() {
    if(this.state.fireRedirect){
      this.setState({fireRedirect:false})
      return (<Redirect to="/anecdotes" />)
    }
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      page: 'home',
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  setNotification = (notification,seconds) => {
    this.setState({notification})
    setTimeout(()=>{
      this.setState({notification:''})
    },1000*seconds)
  }

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <div>
              <Menu />
            </div>
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <About />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/new" render={() => <CreateNew setNotification={this.setNotification} addNew={this.addNew}/>} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
