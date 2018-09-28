import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    return (
      <div className='question-container'>
        {JSON.stringify(this.props)}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { id } = match.params
  const question = questions[id]
  const user = users[authedUser]
  const optionOneVotes = question.optionOne.votes
  const optionTwoVotes = question.optionTwo.votes
  const hasVoted = Object.keys(user.answers).includes(question)

  if (!question) {
    return {
      question: null
    }
  }

  console.log('question: ', question)
  console.log('RESULTS: ', Object.keys(user.answers).includes(question))

  const vote = [optionOneVotes, optionTwoVotes].reduce((vote, key) => {
    if (vote !== null) {
      return vote[0]
    }

    console.log('VOTE: ', vote)
    console.log('KEY: ', key)
    console.log('AuthedUser: ', authedUser)

    return key.includes(authedUser)
      ? key
      : vote
  }, null)

  return {
    question,
    vote,
    hasVoted,
    authedUser,
    authorName: users[question.author].name,
    authorAvatar: users[question.author].avatarURL
  }
}

  export default connect(mapStateToProps)(Question)