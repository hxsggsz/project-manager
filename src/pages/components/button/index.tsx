import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '../spinner'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
}

export const Button = ({ children, isLoading, ...props }: IButton) => (
  <button
    {...props}
    className="grid w-full place-items-center rounded-md bg-violet-main py-2 text-white"
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
