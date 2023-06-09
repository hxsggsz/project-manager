import Image from 'next/image'
import { useState } from 'react'
import { Input } from '@/components/input-auth'
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { Button } from '@/components/button'
import { AuthButtons } from '@/components/auth-buttons'

export default function LogIn() {
  const [isShowPassword, setIsShowPassword] = useState(true)
  return (
    <main className="flex h-screen items-center justify-between p-28 max-lg:justify-center max-lg:p-4 max-lg:pt-12">
      <Image
        width={500}
        height={500}
        src="/rocket.png"
        className="max-lg:hidden"
        alt="a rocket in ignition"
      />

      <div className="flex h-full flex-col items-center gap-4 overflow-hidden">
        <h1 className="whitespace-nowrap">WELCOME BACK</h1>
        <p className="text-center">welcome back! please enter your details</p>
        <Input type="email" placeholder="your best email here" />
        <Input
          isPassword
          isShowPassword={isShowPassword}
          placeholder="password here"
          setIsShowPassword={setIsShowPassword}
          type={isShowPassword ? 'password' : 'text'}
        />

        <div className="flex items-center justify-center">
          or use an alternative way
        </div>

        <div className="flex gap-4">
          <AuthButtons>
            <GithubLogo size={32} />
          </AuthButtons>

          <AuthButtons>
            <LinkedinLogo size={32} />
          </AuthButtons>
        </div>

        <Button>Log in</Button>
      </div>
    </main>
  )
}
