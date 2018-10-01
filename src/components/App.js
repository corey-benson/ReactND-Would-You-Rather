import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import UserLogin from './UserLogin'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import Question from './Question'
import Nav from './Nav'

// unanswered - loxhs1bqm25b708cmbf3g
// answered - xj352vofupe1dqz9emx13r

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
   
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={UserLogin} />
                {/* <Route path='/' exact component={Dashboard} /> */}
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/questions/:id' component={Question} />
                <Route path='/add' component={AddQuestion} />
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
