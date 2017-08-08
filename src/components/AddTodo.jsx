import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const ENTER_KEY = 13

@observer
class AddTodo extends Component {
  render() {
    return (
      <input
        ref="input"
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={e => {
          if (e.keyCode !== ENTER_KEY) {
            return
          }
          e.preventDefault()
          let input = ReactDOM.findDOMNode(this.refs.input)
          let val = input.value.trim()
          if (val) {
            this.props.todoStore.addTodo(val)
            input.value = ''
          }
        }}
        autoFocus={true}
      />
    )
  }
}

AddTodo.propTypes = {
  todoStore: PropTypes.object.isRequired
}

export default AddTodo