import React from 'react'
import { connect } from 'react-redux'

function Leaderboard({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li 
          className='user-entry' 
          key={user.id}>
          <div className='entry'>
            <div className='entry-user'>
              <div className='entry-user__avatar'>
                <img src={user.avatarURL} alt={user.name} />
              </div>
              <div className='entry-user__name'>{user.name}</div>
            </div>
            <div className='entry-body'>
              <div className='entry-body__content'>
                <p className='asked'>You have asked <span>{user.questions}</span> questions.</p>
              </div>
              <div className='entry-body__content'>
                <p className='answered'>And you have answered <span id='answered'>{user.answers}</span> questions.</p>
              </div>
              <div className='entry-body__score'>
                With a total Score of:<br/><span>{user.questions + user.answers}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
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