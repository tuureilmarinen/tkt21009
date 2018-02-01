import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', id:1, number:'+1-212-555-609'}
      ],
      newName: 'new name',
      newNumber: 'new number',
      searchField: ''
    }
  }

  addPerson = (e)=> {
    e.preventDefault()
    const name=this.state.newName
    const number=this.state.newNumber
    const persons=this.state.persons.concat({name, number, id:this.state.persons.length+1})
    const matchingNames = this.state.persons.filter((p)=>p.name===name)
    if(matchingNames.length===0){
      this.setState({persons, newName:'', newNumber:''})

    }

  }
  handleSearchFieldChange = (e) => {
    this.setState({searchField: e.target.value})
  }
  handleNameChange = (e) => {
    this.setState({newName: e.target.value})
  }
  handleNumberChange = (e) => {
    this.setState({newNumber: e.target.value})
  }

  render() {
    const persons = this.state.persons.filter((p)=>p.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
    return (
      <div>
        <div>
          haku:
          <input
            value={this.state.searchField}
            onChange={this.handleSearchFieldChange}
          />
        </div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            puh:
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {persons.map((person)=><Person person={person}/>)}
      </div>
    )
  }
}

export default App
