import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleInputChange = (e) => {
    const { value, name } = e.target
    this.setState(() => ({
      [name]: value
    }))
  }
  isDisabled = () => {
    const { optionOne, optionTwo } = this.state
    return optionOne === '' || optionTwo === ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    this.props.history.push('/')
    this.props.dispatch(handleAddQuestion(optionOne, optionTwo))
  }

  render() {
    const { optionOne, optionTwo } = this.state

    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h3 style={{ marginBottom: 5 }}>Would You Rather?</h3>
        
        <h6>Add your options below.</h6>

        <label className='label' htmlFor='optionOne'>Option One</label>
        <input
          value={optionOne}
          onChange={this.handleInputChange}
          name='optionOne'
          className='input'
          id='optionOne'
          type='text'
        />

        <label className='label' htmlFor='optionTwo'>Option Two</label>
        <input
          value={optionTwo}
          onChange={this.handleInputChange}
          name='optionTwo'
          className='input'
          id='optionTwo'
          type='text'
        />

        <button className='btn' type='submit' disabled={this.isDisabled()}>
          Submit
        </button>
      </form>  
    ) 
  }
}

export default connect()(AddQuestion)