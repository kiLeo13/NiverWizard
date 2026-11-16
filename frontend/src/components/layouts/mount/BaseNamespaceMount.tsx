import type { JSX, ReactNode } from 'react'

import { NamespaceHeader } from './NamespaceHeader'
import { useQuery } from '@tanstack/react-query'
import { namespaceQueries } from '@/api/services/namespace'
import { userQueries } from '@/api/services/user'

import styles from './BaseNamespaceMount.module.css'

interface BaseNamespaceMountProps {
  namespace: string
  children: ReactNode
}

export function BaseNamespaceMount({ namespace, children }: BaseNamespaceMountProps): JSX.Element {
  const { data: nspcData, isLoading: isNspcLoading } = useQuery(namespaceQueries.detail(namespace))
  const { data: ownerData, isLoading: isOwnerLoading } = useQuery({
    ...userQueries.getById(nspcData?.ownerId ?? ''),
    enabled: !!nspcData?.ownerId
  })
  const isLoading = isNspcLoading || isOwnerLoading

  return (
    <div className={styles.mount}>
      <NamespaceHeader owner={ownerData} isLoading={isLoading} />
      {children}
    </div>
  )
}
