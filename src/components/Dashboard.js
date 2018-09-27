import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    console.log('all questions: ', this.props)
    return(
      <div>Dashboard</div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {

  const answers = users[authedUser].answers

  const answered = answers.map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)

  const unanswered = Object.keys(questions)
    .filter((id) => !answers.includes(id))
    .map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)
     
  return {
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)