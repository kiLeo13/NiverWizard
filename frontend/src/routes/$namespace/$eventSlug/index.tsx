import type { JSX } from 'react/jsx-runtime'

import { RichTextEditor } from '@/components/ui/editor/RichTextEditor'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { eventQueries } from '@/api/services/event'

export const Route = createFileRoute('/$namespace/$eventSlug/')({
  component: OverviewBoard
})

function OverviewBoard(): JSX.Element {
  const { namespace, eventSlug } = Route.useParams()
  const { t } = useTranslation('events')

  const { data: eventData } = useQuery(eventQueries.detail(namespace, eventSlug))
  const isOwner = eventData?.userRole === 'owner'

  return <RichTextEditor editable={isOwner} placeholder={t('editor.placeholder')} />
}
