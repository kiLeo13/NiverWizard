import { z } from 'zod'

export const addressSchema = z
  .object({
    city: z.string(),
    state: z.string(),
    street: z.string(),
    number: z.string(),
    zip_code: z.string()
  })
  .transform((v) => ({
    city: v.city,
    state: v.state,
    street: v.street,
    number: v.number,
    zipCode: v.zip_code
  }))

export type Address = z.infer<typeof addressSchema>
