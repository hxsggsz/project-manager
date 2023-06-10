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
    <Link href={href} className="rounded-full bg-violet-main p-2 text-white">
      {children}
    </Link>
  )
}
