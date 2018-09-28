import React, { Component } from 'react'

class AddQuestion extends Component {
  state = {
    question: '',
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
    const { question, optionOne, optionTwo } = this.state
    return question === ''
      || optionOne === ''
      || optionTwo === ''
  }

  render() {
    const { question, optionOne, optionTwo } = this.state

    return (
      <form className='add-form'>
        <h3 style={{ marginBottom: 5 }}>What is your question?</h3>
        <input
          value={question}
          onChange={this.handleInputChange}
          name='question'
          className='input'
          type='text'
        />

        <h3>What are the options?</h3>

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

export default AddQuestion