import React, { Component, useEffect, useState } from 'react'
import { Select, Button, Alert, message, notification } from 'antd'
import { MessageApi } from 'antd/lib/message'

import { History } from 'history'
import {
  WarningFilled,
  InfoCircleOutlined,
  LoginOutlined,
} from '@ant-design/icons'

import * as usersActions from 'actions/users'

import { IUser } from 'models/user'

import { useStore } from 'stores'

import styles from './styles.module.scss'

interface IProps {
  history: History
}

const Login: React.FC<IProps> = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(0)

  const { usersStore, userStore } = useStore()
  const { users } = usersStore
  const { user } = userStore

  const loadUsers = async (): Promise<void> => {
    setLoading(true)
    const hideMessage = message.loading('Loading users list...')

    try {
      await usersActions.getUsers()
    } catch (e) {
      notification.open({
        message: 'Fetch users list error',
        description: e.message || e,
        icon: <WarningFilled style={{ color: 'red' }} />,
      })
    } finally {
      hideMessage()
      setLoading(false)
    }
  }

  const init = (): void => {
    if (user.id) return history.replace('/')

    loadUsers()
  }

  useEffect(() => {
    init()
  }, [])

  const onChangeUser = (userId: number): void => {
    setUserId(userId)
  }

  const onClickSignIn = (): MessageApi | any => {
    if (!userId) {
      return message.info(`Please, select user`, 3)
    }

    const user = users.find((user: IUser) => user.id === userId)
    if (!user) return message.error('Signed error')

    usersActions.setUser(user)
    history.replace('/')
    message.success(`Perfect! You signed in as ${user.name}`, 3)

    if (user.id === 1) {
      notification.open({
        message: 'Admin section',
        description:
          'You have admin permissions. You can go to admin section using link "Admin section" in header',
        icon: <InfoCircleOutlined style={{ color: '#108ee9' }} />,
      })
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.form}>
        <LoginOutlined className={styles.icon} />
        <Alert
          message="Admin section available for Leanne Graham."
          type="info"
          className={styles.alert}
        />
        <Select
          className={styles.search}
          size="large"
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChangeUser}
          value={userId || undefined}
        >
          {users.map((user: IUser) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={onClickSignIn}
          block
        >
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Login
