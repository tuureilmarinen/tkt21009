import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteCreation } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  /*addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch({ 
      type: 'CREATE', 
      content 
    })
  
    e.target.anecdote.value = ''
  }*/
  addAnecdote = (event) => {
    event.preventDefault()
    this.context.store.dispatch(
      anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}
AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
