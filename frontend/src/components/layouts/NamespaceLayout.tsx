import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'

import { Sidebar } from '../sidebars/Sidebar'
import { MemberList } from '../sidebars/MemberList'

import styles from './NamespaceLayout.module.css'

type NamespaceLayoutProps = {
  namespace: string
  children: ReactNode
}

export function NamespaceLayout({ namespace, children }: NamespaceLayoutProps): JSX.Element {
  return (
    <main className={styles.main}>
      <Sidebar namespace={namespace} />

      <div className={styles.board}>{children}</div>

      <MemberList />
    </main>
  )
}
