import { z } from 'zod'
import { eventRoleSchema } from './event-member'
import { addressSchema } from './common'

// ---------- API Contracts ----------
export const OVERVIEW_MAX_LENGTH = 50_000

const playlistProviderSchema = z.enum(['spotify', 'deezer', 'applemusic'])

const galleryProviderSchema = z.enum(['internal', 'googledrive'])

export const playlistResponseSchema = z.object({
  provider: playlistProviderSchema,
  url: z.url()
})

export const eventLocationResponseSchema = z.object({
  name: z.string(),
  address: addressSchema.nullable(),
  mapsUrl: z.url().nullable(),
  instructions: z.string().nullable(),
  photos: z.array(z.url())
})

export const eventResponseSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  namespace: z.string(),
  slug: z.string(),
  name: z.string(),
  overview: z.string().nullable(),
  playlist: playlistResponseSchema.nullable(),
  startsAt: z.iso.datetime(),
  rsvpDeadline: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),

  location: eventLocationResponseSchema,
  galleryProvider: galleryProviderSchema,
  userRole: eventRoleSchema
})

export const eventSummaryResponseSchema = eventResponseSchema.pick({
  id: true,
  name: true,
  slug: true,
  startsAt: true,
  createdAt: true
})

export const listEventsResponseSchema = z.object({
  partialEvents: z.array(eventSummaryResponseSchema),
  hasMore: z.boolean()
})

// ---------- Type Exports ----------
export type PlaylistResponse = z.infer<typeof playlistResponseSchema>
export type EventLocationResponse = z.infer<typeof eventLocationResponseSchema>
export type EventResponse = z.infer<typeof eventResponseSchema>
export type EventSummaryResponse = z.infer<typeof eventSummaryResponseSchema>
export type ListEventsResponse = z.infer<typeof listEventsResponseSchema>
