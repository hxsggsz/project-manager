import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '../spinner'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
}

export const Button = ({ children, isLoading, ...props }: IButton) => (
  <button
    {...props}
    className="grid w-full place-items-center rounded-md bg-violet-main py-2 font-bold text-white transition-all hover:bg-violet-700 active:translate-y-1 disabled:cursor-not-allowed disabled:bg-violet-950"
  >
    {isLoading ? (
      <div data-cy="loading">
        <Spinner />
      </div>
    ) : (
      children
    )}
  </button>
)
