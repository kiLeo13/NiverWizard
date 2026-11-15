import { http, HttpResponse } from 'msw'
import { mockEvents } from '../data/events'
import { respMocks } from './respUtils'
import { mockNamespaces } from '../data/namespaces'

export const eventHandlers = [
  http.get('*/api/namespaces/:namespace/events', ({ params }) => {
    const { namespace } = params

    const nspc = mockNamespaces.find((n) => n.slug === namespace)
    if (!nspc) {
      return respMocks.jsonError(404, {
        code: 'NOT_FOUND',
        message: 'Resource not found'
      })
    }

    // The real API will also check whether the requester has access to this event,
    // but chill, this is just a mock ^^
    const events = mockEvents.filter((e) => e.namespaceId === nspc.slug)

    return HttpResponse.json(
      {
        events: events
      },
      { status: 200 }
    )
  }),

  http.get('*/api/namespaces/:namespace/events/:eventId', ({ params }) => {
    const { eventId } = params

    const event = mockEvents.find((e) => e.id === eventId)
    if (!event) {
      return respMocks.jsonError(404, {
        code: 'NOT_FOUND',
        message: 'Resource not found'
      })
    }

    return HttpResponse.json(event)
  })
]
