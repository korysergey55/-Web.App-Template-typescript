import { api } from '../config'
import { IUser } from 'models/user'

import history from 'utils/history'

import store from '../stores'

const { userStore, usersStore } = store

// common http request
export async function getUser(id: number): Promise<IUser> {
  const res = await api.get(`/users/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch user by id ${id}`)

  return res.data
}

// http request + mobx store
export async function getUsers(): Promise<void> {
  const res = await api.get('/users')
  if (res.status !== 200) throw new Error(`Can't fetch user list`)
  usersStore.setInfo(res.data)
}

// common mobx action
export function setUser(user: IUser): void {
  userStore.setInfo(user)
  localStorage.setItem('user', JSON.stringify(user))
}

export function unsetUser(): void {
  userStore.unSetInfo()
  localStorage.removeItem('user')
  history.replace('/login')
}

export async function authUser(): Promise<IUser | null> {
  try {
    const userStr: string | null = localStorage.getItem('user')
    if (!userStr) return null

    const user = JSON.parse(userStr)
    setUser(user)

    return user
  } catch (e) {
    return null
  }
}
