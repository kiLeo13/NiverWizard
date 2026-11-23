import type { JSX } from 'react/jsx-runtime'

import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { eventQueries } from '@/api/services/event'

export const Route = createFileRoute('/$namespace/$eventSlug')({
  component: BaseEventLayout
})

function BaseEventLayout(): JSX.Element {
  const { namespace, eventSlug } = Route.useParams()
  const { data, isLoading, isError, error } = useQuery(eventQueries.detail(namespace, eventSlug))

  if (data && !isError) return <Outlet />

  return (
    <div>
      {error?.isNotFound && <div>Nothing found</div>}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}
