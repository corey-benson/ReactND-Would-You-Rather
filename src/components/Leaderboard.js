import React from 'react'
import { connect } from 'react-redux'
function Leaderboard({ users }) {
  console.log('users: ', users)
  return (
    <div>Leaderboard</div>
  )
}
function mapStateProps({ users }) {
  return {
    users: Object.keys(users)
      .map((id) => {
        const { name, avatarURL, questions, answers } = users[id]
        return {
          id,
          name,
          avatarURL,
          questions: questions.length,
          answers: answers.length
        }
      })
      .sort((a, b, ) => b.questions + b.answers > a.questions + a.answers)
  }
}
export default connect(mapStateProps)(Leaderboard)