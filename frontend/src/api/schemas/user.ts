import { z } from 'zod'

export const userResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
  bio: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export type UserResponse = z.infer<typeof userResponseSchema>
