import type { JSX } from 'react/jsx-runtime'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$namespace/$eventId/')({
  component: OverviewBoard
})

function OverviewBoard(): JSX.Element {
  return <div>Hello "/$namespace/$eventId/"!</div>
}
