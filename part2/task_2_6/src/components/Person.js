import React from 'react';
import personService from './../services/persons'

const Person = (props) => {
  const removePerson = (id) => {
    return () => {
      //debugger
      if(window.confirm("Are you sure?")){
        props.removePersonHandler(id)
        //debugger
      }
    }
  }
  return (
    <p key={props.person.id}>{props.person.name} ({props.person.number}) <button onClick={removePerson(props.person.id)}>remove</button></p>
  )
}

export default Person
