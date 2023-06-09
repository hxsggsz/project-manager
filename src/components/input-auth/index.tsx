import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'
import { User, Password, Lock, LockOpen } from '@phosphor-icons/react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean
  isShowPassword?: boolean
  setIsShowPassword?: Dispatch<SetStateAction<boolean>>
}

export const Input = ({
  isPassword,
  isShowPassword,
  setIsShowPassword,
  ...props
}: IInput) => {
  return (
    <label className="flex w-full cursor-text rounded-md border-[1px] border-slate-300 focus:border-slate-900">
      {isPassword ? (
        <Password
          size={38}
          weight="bold"
          data-cy="pass"
          className="bg-slate-300 p-2"
        />
      ) : (
        <User
          size={38}
          weight="bold"
          data-cy="user"
          className="bg-slate-300 p-2"
        />
      )}
      <input
        {...props}
        className="w-full pl-2 text-xl outline-none placeholder:text-slate-600"
      />
      {isPassword && (
        <div
          data-cy="button-password"
          className="cursor-pointer"
          onClick={() => setIsShowPassword!((prev) => !prev)}
        >
          {isShowPassword ? (
            <Lock size={38} className="p-2" weight="bold" />
          ) : (
            <LockOpen
              size={38}
              weight="bold"
              className="p-2"
              data-cy="lock-open"
            />
          )}
        </div>
      )}
    </label>
  )
}
