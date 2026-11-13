import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import './index.css'

const router = createRouter({
  routeTree
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

async function enableMocking() {
  if (!import.meta.env.DEV) return

  const { worker } = await import('./api/mocks/browser')

  await worker.start({
    onUnhandledFrame: 'warn'
  })
}

async function bootstrap() {
  await enableMocking()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap application:', error)
})
