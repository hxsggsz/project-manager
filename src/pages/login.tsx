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
import { AuthButtons } from './components/auth-buttons'
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

export default function LogIn() {
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(true)

  const LoginSchema = z.object({
    email: z.string().email('it must be a valid email'),
    password: z.string().min(3, 'password need be more long'),
  })

  type LoginTypes = z.infer<typeof LoginSchema>

  const {
    watch,
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginTypes>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: LoginTypes) {
    try {
      setIsLoading(true)
      setLoginError('')
      const loginResponse = await api.post('/login', data)
      const { token } = loginResponse.data

      setIsLoading(false)
      router.replace(`/api/auth/login?token=${token}`)
    } catch (error: any) {
      setIsLoading(false)
      console.error('signup api', error)
      setLoginError(error.response.data.message)
    }
  }

  const allInputs = watch()

  const handleSubmitDisable = useMemo(() => {
    return allInputs.email === '' || allInputs.password === ''
  }, [allInputs])

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  return (
    <>
      <Head>
        <title>PM - Log In</title>
      </Head>

      <main className="flex h-screen items-center justify-between p-28 max-lg:justify-center max-lg:p-4 max-lg:pt-12">
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

          <div className="flex items-center justify-center">
            or use an alternative way
          </div>

          <div className="flex gap-4">
            <AuthButtons
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
            >
              <GithubLogo size={32} />
            </AuthButtons>

            <AuthButtons
              href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/linkedin&state=wdadwdawdsadegrgygdawd&scope=openid%20profile%20email`}
            >
              <LinkedinLogo size={32} />
            </AuthButtons>
          </div>

          {loginError && <span className="text-red-500">{loginError}</span>}

          <Button
            isLoading={IsLoading}
            disabled={handleSubmitDisable}
            type="submit"
          >
            Log in
          </Button>
          <Link href="/signup">
            Do not have an account?{' '}
            <span className="font-semibold text-violet-main underline hover:opacity-80">
              Sign up
            </span>
          </Link>
        </form>
      </main>
    </>
  )
}
