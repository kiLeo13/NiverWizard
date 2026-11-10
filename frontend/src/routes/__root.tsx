import type { JSX } from 'react/jsx-runtime'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

function RootLayout(): JSX.Element {
  return (
    <>
      <Outlet />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout
})
