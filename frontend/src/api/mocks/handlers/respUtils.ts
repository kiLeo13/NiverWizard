import type { ApiErrorPayload } from '@/api/errors'

import { HttpResponse, type JsonBodyType } from 'msw'

export const respMocks = {
  jsonError: (status: number, body: ApiErrorPayload): HttpResponse<JsonBodyType> => {
    return HttpResponse.json(body, { status: status })
  }
}
