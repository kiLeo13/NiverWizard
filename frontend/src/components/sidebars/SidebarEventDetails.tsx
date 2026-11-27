import type { JSX } from 'react/jsx-runtime'
import type { ReactNode } from 'react'
import type { EventResponse } from '@/api/schemas/event'
import type { TFunction } from 'i18next'

import clsx from 'clsx'

import { WizardTooltip } from '../ui/WizardTooltip'
import { FaCrown } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { userQueries } from '@/api/services/user'
import { useTranslation } from 'react-i18next'
import { fmtDatetime, fmtTime, isDatePast, isDateToday } from '@/utils/datetimeUtils'

import styles from './SidebarEventDetails.module.css'

type SidebarEventDetailsProps = {
  event: EventResponse | undefined
}

type i18nFunc = TFunction<readonly ['common', 'events']>

export function SidebarEventDetails({ event }: SidebarEventDetailsProps): JSX.Element {
  const { t } = useTranslation(['common', 'events'])
  const { data: selfData } = useQuery(userQueries.getSelf())

  const { data: ownerData } = useQuery({
    ...userQueries.getById(event?.ownerId ?? ''),
    enabled: !!event && selfData?.id !== event.ownerId
  })

  const isSelfOwner = event?.userRole === 'owner'
  const ownerName = isSelfOwner ? t('common:you') : ownerData?.displayName
  const isToday = isDateToday(event?.startsAt)
  const isPast = isDatePast(event?.startsAt)
  const startTime = isToday ? fmtTime(event?.startsAt) : fmtDatetime(event?.startsAt)
  const fmtStatus = isPast
    ? t('events:sidebar.details.status.gone')
    : t('events:sidebar.details.status.scheduled')

  return (
    <div className={styles.contents}>
      <DetailItem
        label={t('events:roles.author')}
        value={fmtOwnerName(t, isSelfOwner, ownerName)}
      />

      <DetailItem label={toDatetime(t, isToday)} value={startTime} />

      <DetailItem label={t('events:sidebar.details.status.title')} value={event && fmtStatus} />
    </div>
  )
}

type DetailItemProps = {
  label: string
  value: ReactNode
}

function DetailItem({ label, value }: DetailItemProps): JSX.Element {
  return (
    <div className={styles.detailItem}>
      <div className={clsx(styles.detailLabel, !value && styles.noLabel)}>{label}</div>
      <div className={clsx(styles.detailValue, !value && styles.noValue)}>{value}</div>
    </div>
  )
}

function toDatetime(t: i18nFunc, isToday: boolean): string {
  return isToday ? t('events:sidebar.details.time') : t('events:sidebar.details.date')
}

function fmtOwnerName(t: i18nFunc, isSelfOwner: boolean, name: string | undefined): ReactNode {
  if (!isSelfOwner) return name

  return (
    <>
      <span>{name}</span>
      <WizardTooltip label={t('events:sidebar.ownerCrown')}>
        <FaCrown color="#ece361" />
      </WizardTooltip>
    </>
  )
}
