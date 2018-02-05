import React from 'react'
import axios from 'axios'
import Note from './components/Note'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: '',
      showAll: true
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ notes: response.data })
      })
  }
  toggleImportanceOf = (id) => {
    return () => {
      const url = `http://localhost:3001/notes/${id}`
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      axios
        .put(url, changedNote)
        .then(response => {
          this.setState({
            notes: this.state.notes.map(note => note.id !== id ? note : changedNote)
          })
        })
    }
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date(),
      important: Math.random() > 0.5
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      this.setState({
        notes: this.state.notes.concat(response.data),
        newNote: ''
      })
    })
}

  render() {
    const notesToShow =
    this.state.showAll ?
    this.state.notes :
    this.state.notes.filter(note => note.important)
    console.log('render')
    return (
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={this.toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    );
  }
}

export default App;
