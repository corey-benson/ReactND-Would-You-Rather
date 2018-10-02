import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import UserLogin from './UserLogin'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import Question from './Question'
import FourOhFour from './FourOhFour'
import PrivateRoute from './PrivateRoute'
import { isNullObj } from '../utils/helpers'

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
            {this.props.loading === true
              ? null
              : <div>
                  <Switch>
                    <Route path="/login" component={UserLogin} />
                    <PrivateRoute path="/" exact component={Dashboard} />
                    <PrivateRoute path='/leaderboard' component={Leaderboard} />
                    <PrivateRoute path='/questions/:id' component={Question} />
                    <PrivateRoute path='/add' component={AddQuestion} />
                    <PrivateRoute component={FourOhFour} />
                    {/* <PrivateRoute path="*" component={FourOhFour} /> */}
                  </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {

  console.log('INIT Qs: ', questions)
  return {
    loading: isNullObj(questions) || isNullObj(users)
  }
}

export default connect(mapStateToProps)(App)
