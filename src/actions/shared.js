import { getInitialData } from '../utils/api'
import { receieveUsers } from '../actions/users'
import { receieveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receieveUsers(users))
        dispatch(receieveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}