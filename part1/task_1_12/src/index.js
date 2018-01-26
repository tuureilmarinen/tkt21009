import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(props.anecdotes.length)
    }
    this.state.votes.fill(0)
  }
  randomizeAnecdote = () => {
    return () => {
      this.setState({selected:(Math.floor(Math.random() * anecdotes.length))})
    }
  }
  voteAnecdote = () => {
    let func = () => {
      const index=this.state.selected
      const v = this.state.votes.slice()
      v[index]=this.getVoteCount(index)+1
      this.setState({votes:v})
    }
    func=func.bind(this)
    return func
  }
  getVoteCount = (index) => {
    if(typeof(this.state.votes[index])!=="undefined"){
      return(this.state.votes[index])
    } else {
      return 0
    }

  }
  findMostPopularIndex = () =>{
    const maxval=Math.max(...this.state.votes)
    let index=0
    for(let i=0;i<this.state.votes.length;i++){
      if(this.state.votes[i]===maxval){
        index=i
      }
    }
    //debugger
    return index
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <br/>
        <b>{this.getVoteCount(this.state.selected)}</b>
        <button onClick={this.randomizeAnecdote()}>seuraava</button>
        <button onClick={this.voteAnecdote().bind(this)}>vote</button>
        <br/>
        <h1>The most popular one</h1>
        {this.props.anecdotes[this.findMostPopularIndex()]}
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
