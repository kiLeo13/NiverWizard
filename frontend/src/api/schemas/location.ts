import { z } from 'zod'
import { addressSchema } from './common'

export const eventLocationResponseSchema = z.object({
  name: z.string(),
  address: addressSchema.nullable(),
  mapsUrl: z.url().nullable(),
  instructions: z.string().nullable(),
  photos: z.array(z.url())
})

export type EventLocationResponse = z.infer<typeof eventLocationResponseSchema>
