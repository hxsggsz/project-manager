import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('it must be a valid email'),
  password: z.string().min(8, 'password need be more long'),
})

export type LoginTypes = z.infer<typeof LoginSchema>
