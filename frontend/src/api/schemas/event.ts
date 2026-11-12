import { z } from 'zod'
import { eventRoleSchema } from './event-member'
import { toDate } from '@/utils/timeUtils'

export const playlistProviderSchema = z.enum(['spotify', 'deezer', 'applemusic'])

export const playlistResponseSchema = z.object({
  provider: playlistProviderSchema,
  url: z.url()
})

export const eventResponseSchema = z
  .object({
    id: z.string(),
    namespace_id: z.string(),
    name: z.string(),
    overview: z.string().nullable(),
    banner_url: z.url().nullable(),
    accent_color: z.string().regex(/^#[0-9a-fA-F]{6}$/).nullable(),
    playlist: playlistResponseSchema.nullable(),
    starts_at: z.iso.datetime(),
    rsvp_deadline: z.iso.datetime().nullable(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),

    owner_id: z.string(),
    user_role: eventRoleSchema
  })
  .transform((v) => ({
    id: v.id,
    namespaceId: v.namespace_id,
    name: v.name,
    overview: v.overview,
    bannerUrl: v.banner_url,
    accentColor: v.accent_color,
    playlist: v.playlist,
    startsAt: toDate(v.starts_at),
    rsvpDeadline: toDate(v.rsvp_deadline),
    createdAt: toDate(v.created_at),
    updatedAt: toDate(v.updated_at),

    ownerId: v.owner_id,
    userRole: v.user_role
  }))

export type EventResponse = z.infer<typeof eventResponseSchema>
