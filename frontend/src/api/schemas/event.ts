import { z } from 'zod'
import { eventRoleSchema } from './event-member'

// ---------- API Contracts ----------
const playlistProviderSchema = z.enum(['spotify', 'deezer', 'applemusic'])

const playlistResponseSchema = z.object({
  provider: playlistProviderSchema,
  url: z.url()
})

export const eventResponseSchema = z.object({
  id: z.string(),
  namespaceId: z.string(),
  name: z.string(),
  overview: z.string().nullable(),
  bannerUrl: z.url().nullable(),
  accentColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .nullable(),
  playlist: playlistResponseSchema.nullable(),
  startsAt: z.iso.datetime(),
  rsvpDeadline: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),

  ownerId: z.string(),
  userRole: eventRoleSchema
})

const eventSummaryResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.iso.datetime()
})

export const listEventsResponseSchema = z.object({
  partialEvents: z.array(eventSummaryResponseSchema),
  hasMore: z.boolean()
})

// ---------- Type Exports ----------
export type EventResponse = z.infer<typeof eventResponseSchema>
export type ListEventsResponse = z.infer<typeof listEventsResponseSchema>
