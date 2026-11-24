import type { ListEventsResponse } from '@/api/schemas/event'

import { delay, http, HttpResponse } from 'msw'
import { mockEvents } from '../data/events'
import { respMocks } from './respUtils'
import { mockNamespaces } from '../data/namespaces'

export const eventHandlers = [
  http.get('*/api/namespaces/:namespace/events', async ({ params }) => {
    const { namespace } = params
    await delay(250)

    const nspc = mockNamespaces.find((n) => n.slug === namespace)
    if (!nspc) {
      return respMocks.jsonError(404, {
        errors: {
          code: 'NOT_FOUND',
          message: 'Resource not found'
        }
      })
    }

    // The real API will also check whether the requester has access to this event,
    // but chill, this is just a mock ^^
    const events = mockEvents.filter((e) => e.namespace === nspc.slug)
    const resp: ListEventsResponse = {
      hasMore: false,
      partialEvents: events.map((e) => ({
        id: e.id,
        name: e.name,
        slug: e.slug,
        startsAt: e.startsAt,
        createdAt: e.createdAt
      }))
    }

    return HttpResponse.json(resp, { status: 200 })
  }),

  http.get('*/api/namespaces/:namespace/events/:eventSlug', async ({ params }) => {
    const { eventSlug } = params
    await delay(250)

    const event = mockEvents.find((e) => e.slug === eventSlug)
    if (!event) {
      return respMocks.jsonError(404, {
        errors: {
          code: 'NOT_FOUND',
          message: 'Resource not found'
        }
      })
    }

    return HttpResponse.json(event)
  })
]
