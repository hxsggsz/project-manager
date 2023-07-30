import { z } from 'zod'

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(5, 'your name need be bigger')
      .max(30, 'your name need be smaller')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(' ')
      }),
    username: z
      .string()
      .min(5, 'your username need be bigger')
      .max(30, 'your username need be smaller')
      .transform((username) => {
        return username
          .trim()
          .split(' ')
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(' ')
      }),
    email: z.string().email('it must be a valid email'),
    password: z
      .string()
      .min(8, 'password need be more long')
      .regex(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'The password need to have one Uppercase, one number and one especial character',
      ),
    confirmPassword: z.string(),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    path: ['confirmPassword'],
    message: 'the password need be equal to the confirmation password',
  })

export type SignUpTypes = z.infer<typeof SignUpSchema>
