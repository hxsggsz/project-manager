import { InputHTMLAttributes, forwardRef } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputContent({ ...props }: InputProps, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className="w-full rounded-md bg-slate-300 pl-1 text-base font-semibold text-slate-600 outline-none transition-all placeholder:text-slate-400 focus:bg-slate-50 focus:placeholder:text-slate-600"
      />
    )
  },
)
