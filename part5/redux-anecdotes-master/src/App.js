import React from 'react';
import {createStore} from 'redux'



class App extends React.Component {
  handleNew = (event) => {
    event.preventDefault()
    this.props.store.dispatch({ 
      type: "NEW_ANECDOTE", 
      content: event.target.anecdote.value
    })
  
    event.target.anecdote.value = ''
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((x,y)=>{y.votes-x.votes}).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleNew}>
          <div><input name="anecdote"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App