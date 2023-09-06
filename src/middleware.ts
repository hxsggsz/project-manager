import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse) {
  const userCookie = req.cookies.has('token')
  if (!userCookie) {
    return NextResponse.redirect(new URL('/signup', req.url))
  }

  if (req.nextUrl.pathname === '/' && userCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
}

export const config = {
  matcher: ['/', '/dashboard'],
}
