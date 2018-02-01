import React from 'react';

const PersonAddingForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        nimi:
        <input
          value={props.nameValue}
          onChange={props.nameOnChange}
        />
      </div>
      <div>
        puh:
        <input
          value={props.numberValue}
          onChange={props.numberOnChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonAddingForm
