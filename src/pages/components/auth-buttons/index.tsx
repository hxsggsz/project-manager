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
      className="rounded-full bg-violet-main p-2 text-white transition-all duration-500 hover:scale-110 hover:bg-violet-800"
    >
      {children}
    </Link>
  )
}
