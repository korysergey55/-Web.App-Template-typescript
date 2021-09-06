import React from 'react'
import { Layout } from 'antd'

import styles from './styles.module.scss'

export default function Footer(): React.ReactElement {
  return (
    <Layout.Footer className={styles.footer}>
      Application template (Mobx with decorators) 2021
    </Layout.Footer>
  )
}
