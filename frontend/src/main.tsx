import * as Tooltip from '@radix-ui/react-tooltip'

import { StrictMode } from 'react'
import { noop, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { userQueries } from './api/services/user'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { i18nReady } from './i18n'

import './index.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      retry: 1
    }
  }
})

const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient
  }
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
  await i18nReady

  void queryClient.query(userQueries.getSelf()).catch(noop)

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Tooltip.Provider delayDuration={500} skipDelayDuration={300}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Tooltip.Provider>
    </StrictMode>
  )
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap application:', error)
})
