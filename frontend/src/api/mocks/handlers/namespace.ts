import { delay, http, HttpResponse } from 'msw'
import { mockNamespaces } from '../data/namespaces'
import { respMocks } from './respUtils'

export const namespaceHandlers = [
  http.get('*/api/namespaces/:slug', async ({ params }) => {
    const { slug } = params
    await delay(250)

    const data = mockNamespaces.find((n) => n.slug === slug)
    if (!data) {
      return respMocks.jsonError(404, {
        errors: {
          code: 'NOT_FOUND',
          message: 'Resource not found'
        }
      })
    }

    return HttpResponse.json(data, { status: 200 })
  })
]
