import type { JSX } from 'react/jsx-runtime'
import type { EventResponse } from '@/api/schemas/event'

import { WizardDropdown } from '../ui/dropdown/WizardDropdown'
import { eventQueries } from '@/api/services/event'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import styles from './SidebarEventSelector.module.css'

type SidebarEventSelectorProps = {
  namespace: string
  eventData: EventResponse | undefined
}

export function SidebarEventSelector({
  namespace,
  eventData
}: SidebarEventSelectorProps): JSX.Element {
  const navigate = useNavigate()
  const { t } = useTranslation('events')
  const { data: events } = useQuery(eventQueries.listByNamespace(namespace))

  const opts = events?.partialEvents.map((e) => ({
    label: e.name,
    value: e.slug
  }))

  const handleSelect = (val: string) => {
    navigate({
      to: '/$namespace/$eventSlug',
      params: { namespace, eventSlug: val }
    })
  }

  return (
    <div className={styles.contents}>
      <WizardDropdown
        placeholder={t('sidebar.selection.placeholder')}
        onChange={handleSelect}
        options={opts || []}
        value={eventData?.slug}
      />
    </div>
  )
}
