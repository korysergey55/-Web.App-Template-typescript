import {
  observable,
  action,
  computed,
  reaction,
  makeAutoObservable,
} from 'mobx'
import { IUser } from '../models'

class UserStore {
  constructor() {
    makeAutoObservable(this)
    // reaction(
    //   () => this.user,
    //   _ => console.log(this.user)
    // )
  }

  @observable user: IUser = { id: 0, name: '', company: { name: '' } }

  @action setInfo = (userInfo: IUser): void => {
    this.user = userInfo
  }

  @action unSetInfo = (): void => {
    this.user = { id: 0, name: '', company: { name: '' } }
  }

  @computed get info(): any {
    return {
      name: this.user.name,
    }
  }
}

export default new UserStore()
