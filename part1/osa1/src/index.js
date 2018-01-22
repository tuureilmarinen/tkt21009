import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Display= ({counter}) => {
  return (
    <div>{counter}</div>
  )
}
const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const laskuri = () => {
  console.log("klikattu")
}
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }

    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 })
    }, 1000)

  }
  asetaArvoon = (value) =>
    () => {
      this.setState({counter:value})
    }

  addThousand = () =>{
    this.setState({counter:this.state.counter + 1000})
  }
  zero= () =>{
    this.setState({counter:0})
  }
  render() {
    return (
      <div>
        <Display counter={this.state.counter}/>
        <div>
          <Button
            handleClick={this.asetaArvoon(this.state.counter + 1)}
            text="Plus"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.counter - 1)}
            text="Minus"
          />
          <Button
            handleClick={this.asetaArvoon(0)}
            text="Zero"
          />
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
