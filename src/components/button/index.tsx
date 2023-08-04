import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '../spinner'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  isFull?: boolean
}

export const Button = ({ children, isLoading, isFull, ...props }: IButton) => (
  <button
    {...props}
    data-full={isFull}
    className="grid place-items-center rounded-md bg-violet-main px-4 py-2 font-bold text-white transition-all data-[full=open]:w-full hover:bg-violet-700 active:translate-y-1 disabled:cursor-not-allowed disabled:bg-violet-950 max-md:w-full"
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
