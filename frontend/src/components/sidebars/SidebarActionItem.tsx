import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'

import clsx from 'clsx'

import { FaLock } from 'react-icons/fa6'

import styles from './SidebarActionItem.module.css'

type SidebarActionItemProps = {
  icon: ReactNode
  label: string
  disabled?: boolean
}

export function SidebarActionItem({ icon, label, disabled }: SidebarActionItemProps): JSX.Element {
  return (
    <div className={clsx(styles.item, disabled && styles.disabled)}>
      {disabled ? <FaLock size={14} /> : icon}
      <span className={styles.label}>{label}</span>
    </div>
  )
}
