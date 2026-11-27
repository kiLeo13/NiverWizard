import type { JSX } from 'react/jsx-runtime'
import type { EventResponse } from '@/api/schemas/event'

import { WizardTooltip } from '../ui/WizardTooltip'
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
  const hasEvents = events?.partialEvents.length !== 0

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
      <WizardTooltip disabled={hasEvents} label={t('sidebar.selection.empty')}>
        {/* Dropdown must be wrapped in a generic div to avoid having its data-states overwritten */}
        <div>
          <WizardDropdown
            placeholder={t('sidebar.selection.placeholder')}
            disabled={!hasEvents}
            onChange={handleSelect}
            options={opts || []}
            value={eventData?.slug}
          />
        </div>
      </WizardTooltip>
    </div>
  )
}
