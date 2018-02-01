import React from 'react';
import PersonAddingForm from './components/PersonAddingForm'
import Persons from './components/Persons'

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
    return (
      <div>
        <div>
          haku:
          <input
            value={this.state.searchField}
            onChange={this.handleSearchFieldChange}
          />
        </div>
        <PersonAddingForm
          onSubmit={this.addPerson}
          numberValue={this.state.newNumber}
          nameValue={this.state.newName}
          numberOnChange={this.handleNumberChange}
          nameOnChange={this.handleNameChange} />
        <h2>Puhelinluettelo</h2>
        <Persons persons={this.state.persons} filter={this.state.searchField} />
      </div>
    )
  }
}

export default App
