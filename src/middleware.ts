// import { hasCookie } from 'cookies-next'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, res: NextResponse) {
  const userCookie = req.cookies.has('token')
  if (!userCookie) {
    console.log('[cookies]', userCookie)
    return NextResponse.redirect(new URL('/signup', req.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard'],
}
