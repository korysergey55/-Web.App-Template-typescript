import {
  makeAutoObservable,
  configure,
  computed,
  observable,
  action,
  reaction,
  runInAction,
  toJS,
} from 'mobx'


class Modal {
  @observable modal = false
 
  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.modal,
      _ => console.log(toJS(this.modal))
    )
  }

  @action setModal() {
    this.modal = !this.modal
  }

}
export default new Modal()
