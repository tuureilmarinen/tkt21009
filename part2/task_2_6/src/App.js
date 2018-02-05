import React from 'react';
import PersonAddingForm from './components/PersonAddingForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: 'new name',
      newNumber: 'new number',
      searchField: '',
      notification:''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      date: new Date()
    }
    const matchingNames = this.state.persons.filter((p)=>p.name===personObject.name)
    if(matchingNames.length===0){
      personService.create(personObject).then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: '',
          notification: 'Created new person'
        })
        console.log(response)
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000)
      })
    } else if(window.confirm("Person already exists. update number?")){
      const id = matchingNames[0].id
      personObject.id=id
      personService.update(id,personObject).then(response => {
        const clonedArr = this.state.persons.map((p)=>{
          if(p.id===id){
            return personObject
          } else {
            return p
          }
        })
        this.setState({persons:clonedArr})
      }).catch((r)=>{
        personService.create(personObject).then(()=>{
          const clonedArr = this.state.persons.map((p)=>{
            if(p.id===id){
              return personObject
            } else {
              return p
            }
          })
          this.setState({persons:clonedArr})
        })
      })
      
      
      

    }
  }
  handlePersonRemove = (id) => {
      console.log("removing ",id)
      const newArr=this.state.persons.slice().filter((p)=>p.id!=id)
      personService.remove(id).then((response)=>{
        this.setState({persons:newArr})
      })
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
  componentWillMount() {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      //debugger
      this.setState({persons:response.data})
    })
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
        <Notification message={this.state.notification} />
        <h2>Puhelinluettelo</h2>
        <Persons persons={this.state.persons} filter={this.state.searchField} removePersonHandler={this.handlePersonRemove} />
      </div>
    )
  }
}

export default App
