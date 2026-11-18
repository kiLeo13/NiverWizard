import type { JSX } from 'react/jsx-runtime'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$namespace/$eventSlug/')({
  component: OverviewBoard
})

function OverviewBoard(): JSX.Element {
  return <div>Hello "/$namespace/$eventId/"!</div>
}
