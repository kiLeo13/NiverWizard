import { http, HttpResponse } from 'msw'
import { mockEvents } from '../data/events'
import { respMocks } from './respUtils'

export const eventHandlers = [
  http.get('*/namespaces/:namespaceId/events', ({ params }) => {
    const { namespaceId } = params

    const events = mockEvents.filter((e) => e.namespaceId === namespaceId)

    return HttpResponse.json(events)
  }),

  http.get('*/namespaces/:namespaceId/events/:eventId', ({ params }) => {
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
