import type { JSX } from 'react/jsx-runtime'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$namespace/$eventId/playlist')({
  component: PlaylistView
})

function PlaylistView(): JSX.Element {
  return <div>Hello "/$namespace/$eventId/playlist"!</div>
}
