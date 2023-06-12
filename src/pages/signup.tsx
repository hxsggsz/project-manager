import { z } from 'zod'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from './components/button'
import { Input } from './components/input-auth'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

export default function SignUp() {
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(true)

  const SignUpSchema = z
    .object({
      name: z
        .string()
        .min(5, 'your name need be bigger')
        .max(30, 'your name need be smaller')
        .transform((name) => {
          return name
            .trim()
            .split(' ')
            .map((word) =>
              word[0].toLocaleUpperCase().concat(word.substring(1)),
            )
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
            .map((word) =>
              word[0].toLocaleUpperCase().concat(word.substring(1)),
            )
            .join(' ')
        }),
      email: z.string().email('it must be a valid email'),
      password: z.string().min(3, 'password need be more long'),
      confirmPassword: z.string(),
    })
    .refine((inputs) => inputs.password === inputs.confirmPassword, {
      path: ['confirmPassword'],
      message: 'the password need be equal to the confirmation password',
    })

  type SignUpTypes = z.infer<typeof SignUpSchema>

  const {
    watch,
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpTypes>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  async function onSubmit(data: SignUpTypes) {
    try {
      setIsLoading(true)
      setSignUpError('')
      const signUpResponse = await api.post('/signup', data)
      const { token } = signUpResponse.data

      setIsLoading(false)
      router.replace(`/api/auth/login?token=${token}`)
    } catch (error: any) {
      setIsLoading(false)
      console.error('signup api', error)
      setSignUpError(error.response.data.message)
    }
  }

  const allInputs = watch()

  const handleSubmitDisable = useMemo(() => {
    return (
      allInputs.confirmPassword === '' ||
      allInputs.password === '' ||
      allInputs.email === '' ||
      allInputs.name === '' ||
      allInputs.username === ''
    )
  }, [allInputs])

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  return (
    <>
      <Head>
        <title>PM - Sign Up</title>
      </Head>

      <main className="flex h-screen items-center justify-between p-16 max-lg:justify-center max-lg:p-4 max-lg:pt-12">
        <Image
          width={500}
          height={500}
          quality={100}
          src="/rocket.png"
          className="max-lg:hidden"
          alt="a rocket in ignition"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full max-w-lg flex-col items-center gap-4"
        >
          <h1 className="whitespace-nowrap">WELCOME BACK</h1>
          <p className="text-center">welcome back! please enter your details</p>

          <div className="flex w-full gap-4 text-start max-sm:flex-col">
            <div>
              <Input
                type="text"
                {...register('name')}
                placeholder="your best name here"
              />

              {errors.name && (
                <span className="pl-2 text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="">
              <Input
                type="text"
                {...register('username')}
                placeholder="your best username"
              />

              {errors.username && (
                <span className="pl-2 text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full text-start">
            <Input
              IsEmail
              type="email"
              {...register('email')}
              placeholder="your best email here"
            />

            {errors.email && (
              <span className="pl-2 text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="w-full text-start">
            <Input
              IsPassword
              {...register('password')}
              placeholder="password here"
              IsShowPassword={isShowPassword}
              setIsShowPassword={setIsShowPassword}
              type={isShowPassword ? 'password' : 'text'}
            />

            {errors.password && (
              <span className="pl-2 text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full text-start">
            <Input
              IsPassword
              IsShowPassword={isShowPassword}
              {...register('confirmPassword')}
              placeholder="them same password here"
              setIsShowPassword={setIsShowPassword}
              type={isShowPassword ? 'password' : 'text'}
            />

            {errors.confirmPassword && (
              <span className="pl-2 text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {signUpError && <span className="text-red-500">{signUpError}</span>}

          <Button
            type="submit"
            isLoading={IsLoading}
            disabled={handleSubmitDisable}
          >
            Sign Up
          </Button>
          <Link href="/login">
            Already have an account?{' '}
            <span className="font-semibold text-violet-main underline hover:opacity-80">
              Log In
            </span>
          </Link>
        </form>
      </main>
    </>
  )
}
