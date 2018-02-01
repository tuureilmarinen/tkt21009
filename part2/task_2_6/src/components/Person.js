import React from 'react';

const Person = (props) => {

  return (
    <p key={props.person.id}>{props.person.name} ({props.person.number})</p>
  )
}

export default Person
