import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPercentage } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/answers'

class Question extends Component {

  handleAnswer = (answer) => {
    // Answer needs to be either optionOne or optionTwo
    const { question, authedUser } = this.props
    this.answered = true
    // this.props.dispatch(handleAnswerQuestion({
    //   // authedUser,
    //   answer,
    //   id: question.id,
    // }))
    this.props.dispatch(handleAnswerQuestion(question.id, answer))
    console.log('Add Answer ID:', question.id)
    console.log('Add Answer Option:', answer)
  }

  render() {
    console.log('PROPS: ', this.props)
    if (this.props.question === null) {
      return <p>This question does not exist!</p>
    }

    const { question, vote, authorAvatar, authorName } = this.props
    const optionOne = question.optionOne
    const optionTwo = question.optionTwo
    const totalVotes = optionOne.votes.length + optionTwo.votes.length  
    console.log('TOTAL VOTES: ', totalVotes)

    return (
      <div className='question-container'>
        <div className='question-author'>
          <em>Asked by {authorName}</em> <img src={authorAvatar} alt="Author's avatar" />
        </div>
        <h1 className='question'>Would You Rather?</h1>
        <ul>
          {[optionOne, optionTwo].map((question, key) => { 
            const count = question.votes.length
            let option = ''

            console.log('Votes Length: ', count)
            console.log('LOG: ', question)

            return (
              <li
                onClick={() => {
                  if (vote === null && !this.answered) {
                    option = (key === 0) ? 'optionOne' : 'optionTwo'
                    this.handleAnswer(option)
                  }
                  console.log('ANSWER: ', option)
                }}
                key={question.text}  
                className={`option ${vote === question.votes ? 'chosen' : ''}`}>
                {vote === null
                  ? question.text
                  : <div className='result'>
                      <span>{question.text}</span>
                    <span>{getPercentage(count, totalVotes)}% ({count} out of {totalVotes} votes)</span>
                      {/* <span>{key}</span> */}
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

  const chkVoteKeys = () => [optionOneVotes, optionTwoVotes]

  const vote = chkVoteKeys().reduce((vote, key) => {
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