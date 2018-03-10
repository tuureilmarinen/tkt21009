const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = {anecdotes:anecdotesAtStart.map(asObject)}

const reducer = (store = initialState, action) => {
  if (action.type==='VOTE') {
    //debugger
    const id = action.data.id
    const old = store.anecdotes.filter(a => a.id !==id)
    const voted = store.anecdotes.find(a => a.id === id)

    return {...store, anecdotes: [...old, { ...voted, votes: voted.votes+1} ]}
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content, id: getId(), votes:0 }]
  }

  return store
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    data: {
      content,
      important: false,
      id: getId()
    }
  }
}
export const anecdoteVoting = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}


export default reducer