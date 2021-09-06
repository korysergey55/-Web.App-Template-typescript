import React from 'react'
import { Layout, Button, Avatar } from 'antd'
import { LayoutOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import * as usersActions from 'actions/users'

import { useStore } from 'stores'

import styles from './styles.module.scss'

export function Header(): React.ReactElement {
  const { userStore } = useStore()
  const { user } = userStore

  return (
    <Layout.Header>
      <div className={styles.header}>
        <span>
          <Link to="/">
            <LayoutOutlined /> Application template
          </Link>
        </span>
        {user && user.id ? (
          <div className={styles.user}>
            <Avatar icon={<UserOutlined />} className={styles.avatar} />
            <span>{user.name}</span>
            {user.id === 1 && (
              <span>
                &nbsp;
                <Link to="/admin">
                  <Button type="dashed" size="small">
                    Admin panel
                  </Button>
                </Link>
              </span>
            )}
            ,&nbsp;
            <span className={styles.signOut} onClick={usersActions.unsetUser}>
              sign out
            </span>
            .
          </div>
        ) : (
          <Link to="/login">
            <Button type="primary" icon={<LoginOutlined />}>
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Layout.Header>
  )
}

export default Header
