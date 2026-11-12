import { z } from 'zod'

export const apiErrorPayloadSchema = z.object({
  code: z.string(),
  message: z.string().optional(),
  fields: z.record(z.string(), z.string()).optional()
})

export type ApiErrorPayload = z.infer<typeof apiErrorPayloadSchema>

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly fields?: Record<string, string>

  constructor(statusCode: number, payload: ApiErrorPayload) {
    super(payload.message ?? payload.code)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = payload.code
    this.fields = payload.fields
  }

  getFieldError(field: string): string | undefined {
    return this.fields?.[field]
  }
}
