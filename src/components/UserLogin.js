import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser"
import { Link, Redirect } from 'react-router-dom'

class UserLogin extends Component {
  state = {
    username: '',
    login: false
  }

  handleLogin = (user) => {
    console.log('user login: ', user)
    this.setState(() => ({ 
      username: user.id,
      login: true 
    }))

    this.props.dispatch(setAuthedUser(user.id))
    console.log('user login check: ', true)
    console.log('user login: ', user)
  }

  render() {
    const { users, authedUser } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    
    console.log('user login 2: ', this.state.login)
    console.log('user username: ', this.state.username)
    console.log('user authedUser: ', authedUser)

    if (this.state.login) {
      return <Redirect to={from} />
    }

    return(
      <div className='login-container'>
        <h1>Would You Rather?</h1>
        <h2>Please select a user to login:</h2>
        <ul className='login-list'>
          {Object.values(users).map((user) => (
            <li 
              key={user.id}
              className='user'
              onClick={() => this.handleLogin(user)}
            >
              <img src={user.avatarURL} alt="Author's avatar" /><em>{user.name}</em> 
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

function mapStateToProps({ users, authedUser }) {

  console.log('LOGIN: ', users)
  console.log('LOGIN: ', authedUser)

  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(UserLogin)