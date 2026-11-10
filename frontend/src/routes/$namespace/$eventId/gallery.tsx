import type { JSX } from 'react/jsx-runtime'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$namespace/$eventId/gallery')({
  component: GalleryView
})

function GalleryView(): JSX.Element {
  return <div>Hello "/$namespace/$eventId/gallery"!</div>
}
