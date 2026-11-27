import type { JSX } from 'react/jsx-dev-runtime'
import type { UserResponse } from '@/api/schemas/user'

import { GoogleSpinner } from '../../ui/loaders/GoogleSpinner'
import { TwemojiText } from '@/components/ui/TwemojiText'
import { useTranslation } from 'react-i18next'
import { eventQueries } from '@/api/services/event'
import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import styles from './NamespaceHeader.module.css'

type StepType = 'loading' | 'namespace' | 'event' | 'fallback'

type NamespaceHeaderProps = {
  ownerData: UserResponse | undefined
  isOwnerLoading: boolean
}

export function NamespaceHeader({ ownerData, isOwnerLoading }: NamespaceHeaderProps): JSX.Element {
  const { namespace, eventSlug } = useParams({ strict: false })
  const { t } = useTranslation('namespaces')

  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError
  } = useQuery({
    ...eventQueries.detail(namespace!, eventSlug!),
    enabled: !!namespace && !!eventSlug
  })

  const currentStep = resolveStep({
    isLoading: isOwnerLoading || isEventLoading,
    eventFailed: !!eventError,
    hasOwner: !!ownerData,
    hasEvent: !!eventData
  })

  return (
    <header className={styles.header}>
      <div className={styles.headerLabel}>
        {currentStep === 'loading' && <GoogleSpinner />}

        {currentStep === 'namespace' && <span>{ownerData!.displayName}</span>}
        {currentStep === 'event' && <TwemojiText text={eventData!.name} />}

        {currentStep === 'fallback' && <span>{t('root.header.namespaces')}</span>}
      </div>
    </header>
  )
}

type StepResolverOpts = {
  isLoading: boolean
  eventFailed: boolean
  hasOwner: boolean
  hasEvent: boolean
}

function resolveStep({ isLoading, hasOwner, hasEvent }: StepResolverOpts): StepType {
  if (isLoading) return 'loading'

  if (hasEvent) return 'event'

  if (hasOwner) return 'namespace'

  return 'fallback'
}
