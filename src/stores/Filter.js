import { observable } from 'mobx'
import { ALL } from '../constants'

export default class Filter {
  @observable beingEdited = null
  @observable filter = ALL
}