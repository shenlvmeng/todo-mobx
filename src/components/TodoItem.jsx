import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, expr } from 'mobx'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

@observer
class TodoItem extends Component {
  @observable editText = ''

  render() {
    const { filterStore, todo, handleDestroy } = this.props
    return (
      <li
        className={[
          todo.status !== 0 ? 'completed ' : '', 
          expr(() => todo === filterStore.beingEdited ? 'editing' : '')]
        .join('')}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.status !== 0}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {todo.title}
          </label>
          <button onClick={this.handleRemove}>Remove</button>
        </div>
        <input
          className="edit"
          value={this.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    )
  }

  handleSubmit = () => {
    const value = this.editText.trim()
    if (value) {
      this.props.todo.setTitle(value)
      this.editText = value
    } else {
      this.props.handleDestroy(this.props.todo.id)
    }
    this.props.filterStore.beingEdited = null
  }

  handleEdit = () => {
    this.props.filterStore.beingEdited = this.props.todo
    console.log(this.props.filterStore.beingEdited)
    this.editText = this.props.todo.title
  }

  handleKeyDown = (e) => {
    if (e.keyCode === ESCAPE_KEY) {
      this.editText = this.props.todo.title
      this.props.filterStore.beingEdited = null
    } else if (e.keyCode === ENTER_KEY) {
      this.handleSubmit()
    }
  }

  handleChange = (e) => {
    this.editText = e.target.value
  }

  handleToggle = () => {
    this.props.todo.toggle()
  }

  handleRemove = () => {
    this.props.todo.remove()
  }
}

TodoItem.proptypes = {
  todo: PropTypes.object.isRequired,
  filterStore: PropTypes.shape({
    beingEdited: PropTypes.object,
    filter: PropTypes.string.isRequired
  }).isRequired,
  handleDestroy: PropTypes.func.isRequired
}

export default TodoItem