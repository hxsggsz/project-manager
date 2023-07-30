import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthButtons } from '../components/auth-buttons'
import { At, GithubLogo, LinkedinLogo, Password } from '@phosphor-icons/react'
import { LoginSchema, LoginTypes } from '@/utils/validations/login'

export default function LogIn() {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')
  const [IsLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const handleShowPassword = () => setIsShowPassword((prev) => !prev)

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
      const { access_token, refresh_token } = loginResponse.data

      router.replace(
        `/api/auth/login?token=${access_token}&refresh=${refresh_token}`,
      )
    } catch (error: any) {
      console.error('signup api', error)
      setLoginError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const allInputs = watch()

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

          <div className="w-full text-start">
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

            {errors.password && (
              <span className="pl-2 text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center">
            or use an alternative way
          </div>

          <div className="grid w-full gap-4">
            <AuthButtons
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
            >
              <GithubLogo size={32} />
              Login with Github
            </AuthButtons>

            <AuthButtons
              href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_LINKEDIN_URL}/api/auth/linkedin&state=wdadwdawdsadegrgygdawd&scope=openid%20profile%20email`}
            >
              <LinkedinLogo size={32} />
              Login with Linkedin
            </AuthButtons>
          </div>

          {loginError && <span className="text-red-500">{loginError}</span>}

          <Button
            isLoading={IsLoading}
            disabled={allInputs.email === '' || allInputs.password === ''}
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
