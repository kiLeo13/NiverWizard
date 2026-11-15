import type { JSX } from 'react/jsx-runtime'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$namespace/$eventId/location')({
  component: LocationView,
})

function LocationView(): JSX.Element {
  return <div>Hello "/$namespace/$eventId/location"!</div>
}
