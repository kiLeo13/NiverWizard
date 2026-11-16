import { delay, http, HttpResponse } from 'msw'
import { mockUsers } from '../data/users'
import { respMocks } from './respUtils'

export const userHandlers = [
  http.get('*/api/users/:userId', async ({ params }) => {
    const { userId } = params
    await delay(250)

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) {
      return respMocks.jsonError(404, {
        errors: {
          code: 'NOT_FOUND',
          message: 'Resource not found'
        }
      })
    }

    return HttpResponse.json(user, { status: 200 })
  })
]
