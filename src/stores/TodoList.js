import { observable, computed, reaction } from 'mobx';
import TodoItem from './TodoItem'

export default class TodoList {
  id = 0
  @observable todos = []

  @computed get activeTodoCount() {
    return this.todos.filter(todo => todo.status === 0).length
  }

  @computed get completedTodoCount() {
    return this.todos.filter(todo => todo.status === 1).length
  }

  @computed get removedTodoCount() {
    return this.todos.length - this.activeTodoCount - this.completedTodoCount
  }

  saveToStorage() {
    // 第一次不会触发
    reaction(
      () => this.toJS(),
      todos => localStorage.setItem('todo-mobx', JSON.stringify({ todos }))
    )
  }

  addTodo(title) {
    this.id++;
    this.todos.push(new TodoItem({id: this.id, title, status: 0}))
  }

  toggleAll(status) {
    this.todos.forEach(todo => todo.status = +status)
  }

  delete(id) {
    let todoId = this.todos.findIndex(todo => todo.id === id)
    if (todoId !== -1) {
      this.todos.splice(todoId, 1)
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => todo.status === 0)
  }

  toJS() {
    return this.todos.map(todo => todo.toJS())
  }

  static fromJS(arr) {
    const todoStore = new TodoList();
    todoStore.todos = arr.map(todo => TodoItem.from(todo))
    return todoStore
  }
}
