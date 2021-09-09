import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { message } from 'antd'
import { observer } from 'mobx-react'

import { useStore } from 'stores'
interface IProps {
  roles: string[]
  message?: string
  redirectTo?: string | object
}

export const PrivateRoute = (props: RouteProps & IProps): React.ReactElement => {
  const { userStore } = useStore()
  const { user } = userStore

  let allow = false

  allow = !!(user.id && user.id === 1)

  if (!allow)
    message.warning(message ? message : `You have not access to this page`)

  return allow ? (
    <Route {...props} />
  ) : (
    <Redirect to={props.redirectTo ? props.redirectTo : '/'} />
  )
}

export default observer(PrivateRoute)
