import type { JSX } from 'react/jsx-runtime'

import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BaseNamespaceMount } from '@/components/layouts/mount/BaseNamespaceMount'
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
    <BaseNamespaceMount namespace={namespace}>
      <NamespaceLayout namespace={namespace}>
        <Outlet />
      </NamespaceLayout>
    </BaseNamespaceMount>
  )
}
