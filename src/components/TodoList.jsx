import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ACTIVE, COMPLETED, REMOVED } from '../constants'

import TodoItem from './TodoItem'

@observer
class TodoList extends Component {
  render() {
    const { todoStore, filterStore } = this.props
    if (!todoStore.todos.length) {
      return null
    }
    return (
      <section>
        <input 
          type="checkbox"
          onChange={this.toggleAll}
          checked={todoStore.activeTodoCount === 0}
        />
        <ul>
          {this.getVisibleTodos().map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              filterStore={filterStore}
              handleDestroy={this.handleDestroy}
            />
          ))}
        </ul>
      </section>
    )
  }

  getVisibleTodos() {
    const { todoStore, filterStore } = this.props
    return todoStore.todos.filter(todo => {
      switch (filterStore.filter) {
        case ACTIVE:
          return todo.status === 0
        case COMPLETED:
          return todo.status === 1
        case REMOVED:
          return todo.status === 2
        default:
          return true
      }
    })
  }

  toggleAll = (e) => {
    let checked = e.target.checked;
    this.props.todoStore.toggleAll(checked !== 0)
  }

  handleDestroy = (id) => {
    this.props.todoStore.delete(id)
  }
}

TodoList.propTypes = {
  todoStore: PropTypes.object.isRequired,
  filterStore: PropTypes.shape({
    beingEdited: PropTypes.object,
    filter: PropTypes.string.isRequired
  }).isRequired
}

export default TodoList