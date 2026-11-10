import type { JSX } from 'react/jsx-runtime'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$namespace/$eventId/polls')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return <div>Hello "/$namespace/$eventId/polls"!</div>
}
