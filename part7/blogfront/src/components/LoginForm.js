import React from 'react'
import PropTypes from 'prop-types'
import { login,logoff } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import loginService from '../services/login'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      user: true
    }
  }
  create = async (event) => {
    event.persist()
    event.preventDefault()
    console.log("login")

    const c = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    try {
      await this.props.login(c)
      //debugger
      this.setState({user:null})
      //debugger
      
    } catch (exception) {
      //debugger
      alert('käyttäjätunnus tai salasana virheellinen')
    }
    //await this.props.login(c)
  }
  render(){
    const { username,password, handleChange } = this.props
    return (
      <form onSubmit={this.create} className="form-inline my-2 my-lg-0">
        <input
          value={username}
          name='username'
          placeholder="username"
          onChange={handleChange}
        />
        <input
          value={password}
          name='password'
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Luo</button>
      </form>
    )
  }
}


const mapStateToProps = (state) => {
  //debugger
  return {
    user: state.user,
    username: state.username,
    password : state.password
  }
}

export default connect(mapStateToProps, { login,logoff, notify  } )(LoginForm)