import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ALL, ACTIVE, COMPLETED, REMOVED } from '../constants'

@observer
class Footer extends Component {
  render() {
    const { todoStore } = this.props
    if (!todoStore.todos.length) {
      return null
    }
    return (
      <footer className="footer">
        <span>{todoStore.activeTodoCount} left</span>
        <ul className="filters">
          {this.renderFilterLink(ALL, 'All')}
          {this.renderFilterLink(ACTIVE, 'Active')}
          {this.renderFilterLink(COMPLETED, 'Completed')}
          {this.renderFilterLink(REMOVED, 'Removed')}
        </ul>
        {todoStore.completedCount === 0 ?
          null :
          <button onClick={this.clearCompleted}>Clear completed</button>
        }
      </footer>
    )
  }

  renderFilterLink(filtername, desc) {
    const tag = this.props.filterStore.filter === filtername ?
        <span>{desc}</span> :
        <a
          href="#"
          onClick={this.handleClick(filtername)}
        >
          {desc}
        </a>

    return (
      <li>{tag}{' '}</li>
    )
  }

  clearCompleted = () => {
    this.props.todoStore.clearCompleted()
  }

  handleClick = (filtername) => {
    return () => {
      console.log(filtername)
      this.props.filterStore.filter = filtername
    } 
  }
}

Footer.propTypes = {
  todoStore: PropTypes.object.isRequired,
  filterStore: PropTypes.shape({
    beingEdited: PropTypes.object,
    filter: PropTypes.string.isRequired
  }).isRequired
}

export default Footer