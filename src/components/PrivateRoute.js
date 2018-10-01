import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { isNullObj } from '../utils/helpers'
import Nav from './Nav'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      isAuthenticated
      ?
      <Fragment>
        <Nav />
        <div>
          <div>
            <Component {...props} />
          </div>
        </div>
      </Fragment>
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  }} />
)

function mapStateToProps({ authedUser }) {
  return {
    isAuthenticated: !isNullObj(authedUser)
  }
}

export default connect(mapStateToProps, null, null, { pure: false, })(PrivateRoute)