import { z } from 'zod'
import { toDate } from '@/utils/timeUtils'

export const namespaceResponseSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    owner_id: z.string(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime()
  })
  .transform((v) => ({
    id: v.id,
    slug: v.slug,
    ownerId: v.owner_id,
    createdAt: toDate(v.created_at),
    updatedAt: toDate(v.updated_at)
  }))

export type NamespaceResponse = z.infer<typeof namespaceResponseSchema>
