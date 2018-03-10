import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteVoting } from './../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  voteAnecdote = (id) => {
    //debugger
    this.context.store.dispatch(
      anecdoteVoting(id)
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    //const anecdotes = this.props.store.getState()
    //const { anecdotes } = this.context.store.getState()
    const anecdotes = this.context.store.getState()
    console.log(anecdotes)
    //debugger

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                //this.props.store.dispatch({ type: 'VOTE', id: anecdote.id })
                this.voteAnecdote(anecdote.id)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
