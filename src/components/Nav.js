import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from "../actions/authedUser"

class Nav extends Component {
  state = {
    signOut: false
  }

  handleLogOut = (e) => {
    e.preventDefault()

    this.props.dispatch(logOut())
    this.setState(() => ({
      signOut: true
    }))
  }

  render() {
    const { currentUser} = this.props
    const { signOut } = this.state

    if (signOut) {
      return (<Redirect to="/login" />)
    }

    return (
      <nav className='nav'>
        <ul>
          <li><h2>"Would You Rather?"</h2></li>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              Add Question
            </NavLink>
          </li>
          <li className='logged'>
            <span className='logged-user'><img className='logged-user-avatar' src={currentUser.avatarURL} alt={currentUser.name} /> Hello, {currentUser.name}</span>
          </li>
          <li>
            <NavLink to='#' activeClassName='active' onClick={this.handleLogOut}>Sign Out</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
} 

function mapStateToProps({ authedUser, users, id }) {
  const currentUser = users[authedUser]

  return {
    currentUser,
    user: users[id]
  }
}

export default connect(mapStateToProps)(Nav)