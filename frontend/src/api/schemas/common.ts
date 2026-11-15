import { z } from 'zod'

export const voidSchema = z
  .undefined()
  .or(z.null())
  .or(z.literal(''))
  .transform(() => undefined)

export const addressSchema = z.object({
  city: z.string(),
  state: z.string(),
  street: z.string(),
  number: z.string(),
  zipCode: z.string()
})

export type Void = z.infer<typeof voidSchema>

export type Address = z.infer<typeof addressSchema>
