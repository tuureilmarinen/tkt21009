import React from 'react';
import Person from './Person'

const Persons = (props) => {
  const persons = props.persons.filter((p)=>p.name.toLowerCase().includes(props.filter.toLowerCase()))
  return (
    <div>
    {persons.map((person)=><Person key={person.id} person={person} removePersonHandler={props.removePersonHandler}/>)}
    </div>
  )
}
export default Persons
