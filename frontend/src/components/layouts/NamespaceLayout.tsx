import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'

import { Sidebar } from '../sidebars/Sidebar'
import { MemberList } from '../sidebars/MemberList'

import styles from './NamespaceLayout.module.css'

type NamespaceLayoutProps = {
  children: ReactNode
}

export function NamespaceLayout({ children }: NamespaceLayoutProps): JSX.Element {
  
  return (
    <main className={styles.main}>
      <Sidebar />

      <div className={styles.board}>{children}</div>

      <MemberList />
    </main>
  )
}
