import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import DevTools from 'mobx-react-devtools'

import TodoList from './TodoList'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import Footer from './Footer'
import { ALL, ACTIVE, COMPLETED } from '../constants'

@observer
class App extends Component {
  render() {
    const { todoStore, filterStore } = this.props;
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <AddTodo todoStore={todoStore} />
        </header>
        <TodoList todoStore={todoStore} filterStore={filterStore} />
        <Footer todoStore={todoStore} filterStore={filterStore} />
        <DevTools />
      </div>
    )
  }
}

App.propTypes = {
  todoStore: PropTypes.object.isRequired,
  filterStore: PropTypes.shape({
    beingEdited: PropTypes.object,
    filter: PropTypes.string.isRequired
  }).isRequired
}

export default App;
