import React from 'react'
import { render } from 'react-dom'

import TodoList from './stores/TodoList'
import Filter from './stores/Filter'
import App from './components/App';

const todos = JSON.parse(localStorage.getItem('todo-mobx', 'todos'))

let todoStore = TodoList.fromJS(todos || [])
let filterStore = new Filter()

render(
  <App 
    todoStore={todoStore} 
    filterStore={filterStore}
  />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    render(
      <NextApp 
        todoStore={todoStore} 
        filterStore={filterStore}
      />,
      document.getElementById('root')
    )
  })
}
