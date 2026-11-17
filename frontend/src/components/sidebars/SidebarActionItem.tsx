import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'

import styles from './SidebarActionItem.module.css'

type SidebarActionItemProps = {
  icon: ReactNode
  label: string
}

export function SidebarActionItem({ icon, label }: SidebarActionItemProps): JSX.Element {
  return (
    <div className={styles.item}>
      {icon}
      <span className={styles.label}>{label}</span>
    </div>
  )
}
