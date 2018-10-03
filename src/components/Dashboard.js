import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }
  showUnaswered = () => {
    this.setState(() => ({
      showAnswered: false
    }))
  }
  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }))
  }

  render() {
    const { showAnswered } = this.state
    const { answered, unanswered, users } = this.props

    const allQuestions = showAnswered === true
      ? answered
      : unanswered

    return(
      <div className='app-container'>
        <div className='dashboard-toggle'>
          <button
            className={`${showAnswered === false ? 'active-tab' : ''}`}
            onClick={this.showUnaswered}>
            Unanswered
          </button>
          <button
            className={`${showAnswered === true ? 'active-tab' : ''}`}
            onClick={this.showAnswered}>
            Answered
          </button>
        </div>
        <ul className='dashboard-list'>
          {allQuestions.map((question) => (
            <li key={question.id}>
              <Link to={`questions/${question.id}`}>
                <div className='question-author'>
                  <img src={users[question.author].avatarURL} alt="Author's avatar" /><em>{users[question.author].name} asks:</em>
                </div>
                <em>Would You Rather</em>... {question.optionOne.text}
                <button className='btn'>View Poll</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
    unanswered,
    users
  }
}

export default connect(mapStateToProps)(Dashboard)