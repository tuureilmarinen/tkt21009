import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic= ({text,count}) => {
  return (
    <tr><td><b>{text}:</b></td><td>{count}</td></tr>
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
    //this.vote=this.vote.bind(this)
  }
  vote = (arg) => {
    let temp =() => {
      let val=this.state[arg]+1;
      let oldState=this.state;
      oldState[arg]=val;
      this.setState(oldState)
      //debugger
    }
    temp=temp.bind(this)
    return temp
  }
  average = () => {
    console.log(this)
    return (
      ((this.state.good-this.state.bad)/(this.state.good+this.state.bad+this.state.neutral))||0
    )
  }
  positive_percentage = () => {
    return ((((this.state.good)/(this.state.good+this.state.bad+this.state.neutral))*100)||0)+"%"
  }
  render(){
    if(this.state.good+this.state.neutral+this.state.bad>0){
      return (
        <div>
          <h1>Anna palautetta</h1>
          <Button handleClick={this.vote('good').bind(this)} text="Hyvä"/>
          <Button handleClick={this.vote('neutral')} text="Neutraali"/>
          <Button handleClick={this.vote('bad')} text="Huono"/>
          <h1>Statistiikka</h1>
          <table>
            <tbody>
              <Statistic text="hyvä" count={this.state.good} />
              <Statistic text="neutraali" count={this.state.neutral} />
              <Statistic text="huono" count={this.state.bad} />
              <Statistic text="keskiarvo" count={this.average()} />
              <Statistic text="positiivisia" count={this.positive_percentage()} />
            </tbody>
          </table>
        </div>
      )} else {
        return (
          <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={this.vote('good')} text="Hyvä"/>
            <Button handleClick={this.vote('neutral')} text="Neutraali"/>
            <Button handleClick={this.vote('bad')} text="Huono"/>
            <h1>Statistiikka</h1>
            <p>Ei arvosteluja.</p>
          </div>
        )
    }
  }
}

const App = () => {
  return (
    <Statistics />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
