import { z } from 'zod'
import { userResponseSchema } from './user'
import { toDate } from '@/utils/timeUtils'

export const eventRoleSchema = z.enum(['owner', 'organizer', 'member', 'viewer'])
export const rsvpStatusSchema = z.enum(['pending', 'declined', 'confirmed'])

export const eventMemberResponseSchema = z
  .object({
    role: eventRoleSchema,
    rsvp_status: rsvpStatusSchema,
    added_at: z.iso.datetime(),
    user: userResponseSchema
  })
  .transform((v) => ({
    role: v.role,
    rsvpStatus: v.rsvp_status,
    addedAt: toDate(v.added_at),
    user: v.user
  }))

export type EventMemberResponse = z.infer<typeof eventMemberResponseSchema>
