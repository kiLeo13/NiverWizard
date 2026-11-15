import { z } from 'zod'
import { userResponseSchema } from './user'

export const signupRequestSchema = z.object({
  username: z.string(),
  displayName: z.string(),
  password: z.string().min(8).max(64)
})

export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const loginResponseSchema = z.object({
  token: z.string(),
  user: userResponseSchema
})

export type SignupRequest = z.infer<typeof signupRequestSchema>

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
