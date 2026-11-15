import { z } from 'zod'

export const API_ERROR_CODES = [
  'NOT_FOUND',
  'INVALID_FORM_BODY',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'CONFLICT',
  'INTERNAL_SERVER_ERROR',
  'UNKNOWN'
] as const

export const apiErrorCodeSchema = z.enum(API_ERROR_CODES)

export const apiErrorPayloadSchema = z.object({
  errors: z.object({
    code: apiErrorCodeSchema.catch('UNKNOWN'),
    message: z.string().optional(),
    fields: z.record(z.string(), z.string()).optional()
  })
})

export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>
export type ApiErrorPayload = z.infer<typeof apiErrorPayloadSchema>

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly code: ApiErrorCode
  public readonly fields?: Record<string, string>

  constructor(statusCode: number, payload: ApiErrorPayload) {
    super(payload.errors.message ?? payload.errors.code)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = payload.errors.code
    this.fields = payload.errors.fields
  }

  get isNotFound(): boolean {
    return this.statusCode === 404 || this.code === 'NOT_FOUND'
  }

  get isUnauthorized(): boolean {
    return this.statusCode === 401 || this.code === 'UNAUTHORIZED'
  }

  get isValidationError(): boolean {
    return this.code === 'INVALID_FORM_BODY' || this.#hasFailedFields
  }

  getFieldError(field: string): string | undefined {
    return this.fields?.[field]
  }

  get #hasFailedFields(): boolean {
    return Boolean(this.fields && Object.keys(this.fields).length > 0)
  }
}
