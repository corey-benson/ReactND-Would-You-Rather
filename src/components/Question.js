import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  handleAnswer = (answer) => {
    const { question, authedUser } = this.props
    this.answered = true
    console.log('Add Answer:', answer)
  }

  render() {
    console.log('PROPS: ', this.props)
    if (this.props.question === null) {
      return <p>This question does not exist</p>
    }

    const { question, vote, authorAvatar, authorName } = this.props
    const optionOne = question.optionOne
    const optionTwo = question.optionTwo

    return (
      <div className='question-container'>
        <h1 className='question'>Would You Rather?</h1>
        <div className='question-author'>
          <em>Asked by {authorName}</em> <img src={authorAvatar} alt="Author's avatar" />
        </div>
        <ul>
          {[optionOne, optionTwo].map((question, key) => { 
            {/* console.log('LOG: ', [key[0] + 'Votes'].length) */}
            const count = [key[0] + 'Votes'].length

            console.log('LOG: ', question)

            return (
              <li
                onClick={() => {
                  // if (vote === null && !this.answered) {
                  //   this.handleAnswer(key[0])
                  // }
                  // this.handleAnswer(key[0])
                  console.log(key)
                }}
                key={question.text}  
                className={`option ${vote === question.votes ? 'chosen' : ''}`}>
                {vote === null
                  ? key
                  : <div className='result'>
                      <span>{question.text}</span>
                      <span>{key}</span>
                    </div>}
              </li>
            )
          })}
        </ul>
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

    // console.log('VOTE: ', vote)
    // console.log('KEY: ', key)
    // console.log('AuthedUser: ', authedUser)

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