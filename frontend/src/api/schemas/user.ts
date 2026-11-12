import { z } from 'zod'
import { toDate } from '@/utils/timeUtils'

export const userResponseSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    display_name: z.string(),
    bio: z.string().nullable(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime()
  })
  .transform((v) => ({
    id: v.id,
    username: v.username,
    displayName: v.display_name,
    bio: v.bio,
    createdAt: toDate(v.created_at),
    updatedAt: toDate(v.updated_at)
  }))

export type UserResponse = z.infer<typeof userResponseSchema>
