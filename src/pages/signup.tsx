import Head from 'next/head'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { At, Password, UserCircle } from '@phosphor-icons/react'
import { SignUpSchema, SignUpTypes } from '@/utils/validations/signup'

export default function SignUp() {
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

  const handleShowPassword = () => setIsShowPassword((prev) => !prev)
  const handleShowConfirmPassword = () =>
    setIsShowConfirmPassword((prev) => !prev)

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

      const body = {
        name: data.name,
        profilePhoto:
          'https://i.pinimg.com/564x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg',
        username: data.username,
        email: data.email,
        password: data.password,
      }
      const signUpResponse = await api.post('/signUp', body)

      if (signUpResponse.status === 200) {
        router.replace('/login')
      }
    } catch (error: any) {
      console.error('signup api', error)
      setSignUpError(error.message)
    } finally {
      setIsLoading(false)
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

      <main className="flex h-screen items-center justify-center p-16 max-lg:p-4 max-lg:pt-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full max-w-lg flex-col items-center gap-4"
        >
          <h1 className="whitespace-nowrap">WELCOME BACK</h1>
          <p className="text-center">welcome back! please enter your details</p>

          <div className="flex w-full gap-2 text-start">
            <Input.Root>
              <Input.Icon icon={UserCircle} />
              <Input.Input
                type="name"
                {...register('name')}
                placeholder="Your best name"
              />
            </Input.Root>

            {errors.name && (
              <span className="pl-2 text-red-500">{errors.name.message}</span>
            )}

            <Input.Root>
              <Input.Icon icon={UserCircle} />
              <Input.Input
                type="username"
                {...register('username')}
                placeholder="Your best username"
              />
            </Input.Root>

            {errors.username && (
              <span className="pl-2 text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="w-full text-start">
            <Input.Root>
              <Input.Icon icon={At} />
              <Input.Input
                type="email"
                {...register('email')}
                placeholder="Your best email"
              />
            </Input.Root>

            {errors.email && (
              <span className="pl-2 text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex w-full gap-2 text-start">
            <Input.Root>
              <Input.Icon icon={Password} />
              <Input.Input
                type={isShowPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="password here"
              />
              <Input.Password
                IsShowPassword={isShowPassword}
                handleShowPassword={handleShowPassword}
              />
            </Input.Root>

            <Input.Root>
              <Input.Icon icon={Password} />
              <Input.Input
                type={isShowConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="confirm password"
              />
              <Input.Password
                IsShowPassword={isShowConfirmPassword}
                handleShowPassword={handleShowConfirmPassword}
              />
            </Input.Root>
          </div>

          {errors.password && (
            <span className="pl-2 text-red-500">{errors.password.message}</span>
          )}

          {errors.confirmPassword && (
            <span className="pl-2 text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}

          {signUpError && <span className="text-red-500">{signUpError}</span>}

          <Button
            isFull
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
