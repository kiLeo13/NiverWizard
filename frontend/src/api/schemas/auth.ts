import { z } from 'zod'
import { userResponseSchema } from './user'

// Signup
export const signupRequestSchema = z.object({
  username: z.string(),
  display_name: z.string(),
  password: z.string().min(6)
})

// Login
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
