import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserLogin extends Component {
  render() {
    const { users, authedUser } = this.props

    // avatarURL:"https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Kurt&hairColor=Brown&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Default&skinColor=Light"
    // id:"sarahedo"
    // name:"Sarah Edo"
    //<img src={user.avatarURL} alt="Author's avatar" />
    
    return(
      <div className='login-container'>
        <h1>Would You Rather?</h1>
        <h2>Please select a user to login:</h2>
        <ul className='login-list'>
          {Object.values(users).map((user) => (
            <li 
              key={user.id}
              className='user'
              onClick={() => {
                
                console.log('user: ', user)
              }}
            >
              <img src={user.avatarURL} alt="Author's avatar" /><em>{user.name}</em> 
            </li>
          ))}
        </ul>
      </div>
    )
  }

}

function mapStateToProps({ users, authedUser }) {

  console.log('LOGIN: ', users)
  console.log('LOGIN: ', authedUser)

  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(UserLogin)