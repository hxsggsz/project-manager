import { ReactNode } from 'react'

export const AuthButtons = ({ children }: { children: ReactNode }) => {
  return (
    <button className="rounded-full bg-violet-main p-2 text-white">
      {children}
    </button>
  )
}
