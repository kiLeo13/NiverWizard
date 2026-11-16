import type { JSX } from 'react/jsx-dev-runtime'
import type { UserResponse } from '@/api/schemas/user'

import { GoogleSpinner } from '../ui/loaders/GoogleSpinner'
import { GiBalloonDog } from 'react-icons/gi'
import { useTranslation } from 'react-i18next'

import styles from './NamespaceHeader.module.css'

type NamespaceHeaderProps = {
  owner: UserResponse | undefined
  isLoading: boolean
}

export function NamespaceHeader({ owner, isLoading }: NamespaceHeaderProps): JSX.Element {
  const { t } = useTranslation('namespaces')

  return (
    <header className={styles.header}>
      <div className={styles.headerLabel}>
        <GiBalloonDog color="#ffa600" size={26} />
        {isLoading && <GoogleSpinner />}

        {owner && <span>{t('root.header.user', { username: owner.displayName })}</span>}

        {!owner && !isLoading && <span>{t('root.header.namespaces')}</span>}
      </div>
    </header>
  )
}
