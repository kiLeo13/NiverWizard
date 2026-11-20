import type { JSX } from 'react/jsx-runtime'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { eventQueries } from '@/api/services/event'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/$namespace/')({
  component: NamespaceIndexPage
})

function NamespaceIndexPage(): JSX.Element {
  const navigate = useNavigate()
  const { namespace } = Route.useParams()
  const { data: events, isLoading } = useQuery(eventQueries.listByNamespace(namespace))

  useEffect(() => {
    if (events && events.partialEvents.length > 0) {
      navigate({
        to: '/$namespace/$eventSlug',
        params: { namespace, eventSlug: events.partialEvents[0].id },
        replace: true
      })
    }
  }, [events, namespace, navigate])

  return (
    <div>This is the empty events/board outlet</div>
  )
}
