import { hideLoading, showLoading } from 'react-redux-loading'
import { saveQuestionAnswer } from '../utils/api'
import { handleInitialData } from '../actions/shared'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestionAnswer(authedUser, qid, answer)
      .then(() => {
        dispatch(handleInitialData())
        dispatch(hideLoading())
      })
  }
}