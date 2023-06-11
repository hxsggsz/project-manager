import { User, Password, Lock, LockOpen, At } from '@phosphor-icons/react'
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  InputHTMLAttributes,
} from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  IsEmail?: boolean
  IsPassword?: boolean
  IsShowPassword?: boolean
  setIsShowPassword?: Dispatch<SetStateAction<boolean>>
}

export const Input = forwardRef<HTMLInputElement, IInput>(function InputContent(
  { ...props }: IInput,
  ref,
) {
  return (
    <label className="flex w-full cursor-text rounded-md border-[1px] border-slate-300 focus:border-slate-900">
      {props.IsPassword ? (
        <Password
          size={38}
          weight="bold"
          data-cy="pass"
          className="bg-slate-300 p-2"
        />
      ) : props.IsEmail ? (
        <At size={38} weight="bold" className="bg-slate-300 p-2" />
      ) : (
        <User
          size={38}
          weight="bold"
          data-cy="user"
          className="bg-slate-300 p-2"
        />
      )}
      <input
        ref={ref}
        {...props}
        className="w-full pl-2 text-xl outline-none placeholder:text-slate-600"
      />
      {props.IsPassword && (
        <div
          data-cy="button-password"
          className="cursor-pointer"
          onClick={() => props.setIsShowPassword!((prev) => !prev)}
        >
          {props.IsShowPassword ? (
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
})
