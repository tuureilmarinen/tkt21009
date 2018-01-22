import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Display= ({text,count}) => {
  return (
    <div><b>{text}:</b> {count}</div>
  )
}
const Button = ({handleClick,text}) => {
  return (<button onClick={handleClick}>
    {text}
  </button>)
}
class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }
    good = () => {
      this.setState({good: this.state.good+1})
    }
    bad = () => {
      this.setState({bad: this.state.bad+1})
    }
    neutral = () => {
      this.setState({neutral: this.state.neutral+1})
    }

  render(){
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={this.good} text="Hyvä"/>
        <Button handleClick={this.neutral} text="Neutraali"/>
        <Button handleClick={this.bad} text="Huono"/>
        <h1>Statistiikka</h1>
        <Display text="hyvä" count={this.state.good} />
        <Display text="neutraali" count={this.state.neutral} />
        <Display text="huono" count={this.state.bad} />
      </div>
    )
  }
}

const App = () => {
  return (
    <Counter />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
