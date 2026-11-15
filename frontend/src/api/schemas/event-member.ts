import { z } from 'zod'
import { userResponseSchema } from './user'

export const eventRoleSchema = z.enum(['owner', 'organizer', 'member', 'viewer'])
export const rsvpStatusSchema = z.enum(['pending', 'declined', 'confirmed'])

export const eventMemberResponseSchema = z.object({
  role: eventRoleSchema,
  rsvpStatus: rsvpStatusSchema,
  addedAt: z.iso.datetime(),
  user: userResponseSchema
})

export type EventMemberResponse = z.infer<typeof eventMemberResponseSchema>
