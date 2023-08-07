import { z } from 'zod'

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(5, 'it is necessary to have at least 5 characters')
    .max(20, 'it is necessary to have less than 20 characters'),
})

export type CreateProjectProps = z.infer<typeof CreateProjectSchema>
