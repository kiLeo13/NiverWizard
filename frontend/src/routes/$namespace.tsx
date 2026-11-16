import type { JSX } from 'react/jsx-runtime'

import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NamespaceLayout } from '@/components/layouts/NamespaceLayout'

export const Route = createFileRoute('/$namespace')({
  head: () => ({
    meta: [{ title: 'NiverWizard • Namespaces' }]
  }),
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  const { namespace } = Route.useParams()

  return (
    <NamespaceLayout namespace={namespace}>
      <Outlet />
    </NamespaceLayout>
  )
}
