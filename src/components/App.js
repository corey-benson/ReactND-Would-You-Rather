import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import Question from './Question'
import LoadingBar from 'react-redux-loading'

// unanswered - loxhs1bqm25b708cmbf3g
// answered - xj352vofupe1dqz9emx13r

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
   
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <Question match={{ params: { id: 'xj352vofupe1dqz9emx13r' } }} />} 
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
