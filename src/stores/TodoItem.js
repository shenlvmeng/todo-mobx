import { observable } from 'mobx'

export default class TodoItem {
  id
  @observable title
  @observable status

  constructor({ id, title, status }) {
    this.id = id
    this.title = title
    this.status = status
  }

  toggle() {
    this.status = +!this.status
  }

  remove() {
    this.status = 2
  }

  setTitle(title) {
    this.title = title
  }

  toJS() {
    return {
      id: this.id,
      title: this.title,
      status: this.status
    }
  }

  static fromJS(item) {
    return new TodoItem(item)
  }
}