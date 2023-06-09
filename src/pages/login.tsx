import { Input } from '@/components/input'
import { useState } from 'react'

export default function LogIn() {
  const [isShowPassword, setIsShowPassword] = useState(true)
  return (
    <>
      <h1>WELCOME BACK</h1>
      <p>welcome back! please enter your details</p>
      <Input
        isPassword
        isShowPassword={isShowPassword}
        setIsShowPassword={setIsShowPassword}
        type={isShowPassword ? 'password' : 'text'}
      />
    </>
  )
}
