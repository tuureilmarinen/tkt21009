import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic= ({text,count}) => {
  return (
    <div><b>{text}:</b> {count}</div>
  )
}
const Button = ({handleClick,text}) => {
  return (<button onClick={handleClick}>
    {text}
  </button>)
}
class Statistics extends React.Component {
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
  average = () => {
    /*return () => {
      return 609
    }*/
    return (
      ((this.state.good-this.state.bad)/(this.state.good+this.state.bad+this.state.neutral))||0
    )
  }
  positive_percentage = () => {
    return ((((this.state.good)/(this.state.good+this.state.bad+this.state.neutral))*100)||0)+"%"
  }
  render(){
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={this.good} text="Hyvä"/>
        <Button handleClick={this.neutral} text="Neutraali"/>
        <Button handleClick={this.bad} text="Huono"/>
        <h1>Statistiikka</h1>
        <Statistic text="hyvä" count={this.state.good} />
        <Statistic text="neutraali" count={this.state.neutral} />
        <Statistic text="huono" count={this.state.bad} />
        <Statistic text="keskiarvo" count={this.average()} />
        <Statistic text="positiivisia" count={this.positive_percentage()} />
      </div>
    )
  }
}

const App = () => {
  return (
    <Statistics />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
