import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPercentage } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/answers'
import FourOhFour from './FourOhFour'

class Question extends Component {

  handleAnswer = (answer) => {
    // Answer to be either optionOne or optionTwo
    const { question, authedUser } = this.props
    this.answered = true
    this.props.dispatch(handleAnswerQuestion(question.id, answer))
    console.log('Add Answer ID:', question.id)
    console.log('Add Answer Option:', answer)
  }

  render() {
    console.log('PROPS: ', this.props)
    if (this.props.question === null) {
      return <FourOhFour />
    }

    const { user, question, vote, authorAvatar, authorName } = this.props
    const optionOne = question.optionOne
    const optionTwo = question.optionTwo
    const totalVotes = optionOne.votes.length + optionTwo.votes.length  

    return (
      <div className='app-container'>
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
                  onClick={(e) => {
                    e.preventDefault()
                    if (vote === null && !this.answered) {
                      option = (key === 0) ? 'optionOne' : 'optionTwo'
                      this.handleAnswer(option)
                    }
                  }}
                  key={key}  
                  className={`option ${question.votes.includes(vote) || vote === question.votes ? 'chosen' : ''}`}>
                  {vote === null
                    ? question.text
                    : <div className='result'>
                        <span>{question.text}</span>
                        <span>{getPercentage(count, totalVotes)}% ({count} out of {totalVotes} votes)</span>
                      </div>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>  
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { id } = match.params
  const question = questions[id]
  const user = users[authedUser]
  const hasVoted = Object.keys(user.answers).includes(question)
  let vote = null;

  if (!question) {
    return {
      question: null
    }
  }

  if (question.optionOne.votes !== undefined && question.optionTwo.votes !== undefined) {
    const chkVoteKeys = () => [question.optionOne.votes, question.optionTwo.votes]
    vote = chkVoteKeys().reduce((vote, key) => {
      if (vote !== null) {
        return vote[0]
      }

      return key.includes(authedUser)
        ? key
        : vote
    }, null)
  }

  return {
    user,
    question,
    vote,
    hasVoted,
    authedUser,
    authorName: users[question.author].name,
    authorAvatar: users[question.author].avatarURL
  }
}

  export default connect(mapStateToProps)(Question)