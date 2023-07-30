import Link from 'next/link'
import { ReactNode } from 'react'

export const AuthButtons = ({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) => {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-black p-2 font-semibold shadow-inner transition-all hover:shadow-xl active:translate-y-1"
    >
      {children}
    </Link>
  )
}
