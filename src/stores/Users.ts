import {
  observable,
  action,
  computed,
  reaction,
  makeAutoObservable,
  toJS,
} from 'mobx'
import { IUser } from '../models'

class UsersStore {
  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.users,
      _ => console.log(toJS(this.users))
    )
  }

  @observable users: IUser[] = []

  @action setInfo = async (userInfo: IUser[]): Promise<void> => {
    this.users = userInfo
  }

  @action unSetInfo = (): void => {
    this.users = []
  }

  @computed get info(): any {
    return {
      length: this.users.length,
    }
  }
}

export default new UsersStore()
