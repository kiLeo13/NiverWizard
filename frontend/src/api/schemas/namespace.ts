import { z } from 'zod'

export const namespaceResponseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  ownerId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export type NamespaceResponse = z.infer<typeof namespaceResponseSchema>
