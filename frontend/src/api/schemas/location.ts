import { z } from 'zod'
import { addressSchema } from './common'

export const eventLocationSchema = z
  .object({
    name: z.string(),
    address: addressSchema.nullable(),
    maps_url: z.url().nullable(),
    instructions: z.string().nullable(),
    photos: z.array(z.url())
  })
  .transform((v) => ({
    name: v.name,
    address: v.address,
    mapsUrl: v.maps_url,
    instructions: v.instructions,
    photos: v.photos
  }))

export type EventLocation = z.infer<typeof eventLocationSchema>
